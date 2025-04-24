import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { FiMoreVertical } from "react-icons/fi";
import "../../styles/TryOn.css";
// import {TryOn3DView} from "./TryOn3DView";

const TryOn = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const selectedOutfitPath = queryParams.get("image");
  const user_id = queryParams.get("userId");
  const category_id = queryParams.get("categoryId");
  const size_id = queryParams.get("sizeId");

  const cleanedPath = selectedOutfitPath?.replace(/^.*clothe-images[\\/]/, "");
  const selectedOutfit = cleanedPath
    ? `http://localhost:5000/clothe-images/${cleanedPath.replace(/\\/g, "/")}`
    : "";

  const [userImage, setUserImage] = useState(null);
  const [resultImage, setResultImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef();

  const handleUpload = (imageList) => {
    if (imageList.length > 0) {
      setUserImage(imageList[0].file);
    }
  };

  const handleTryOn = async () => {
    if (!userImage || !selectedOutfit) {
      alert("Please upload your image and select an outfit.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(selectedOutfit);
      const blob = await response.blob();
      const outfitFile = new File([blob], "outfit.jpg", { type: blob.type });

      const formData = new FormData();
      formData.append("userImage", userImage);
      formData.append("outfitImage", outfitFile);

      const uploadResponse = await fetch("http://localhost:5000/api/trial/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await uploadResponse.json();

      if (data.success && data.resultImage) {
        setResultImage(data.resultImage);
        await saveTryonData(data.resultImage);
      } else {
        setError("Error generating try-on preview.");
      }
    } catch (error) {
      console.error("❌ Upload error:", error);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const saveTryonData = async (resultImageUrl) => {
    try {
      const response = await fetch("http://localhost:5000/api/virtual-tryon/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          category_id,
          size_id,
          resultImageUrl,
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log("✅ Virtual try-on data saved:", result.savedTryon);
      } else {
        console.warn("⚠️ Try-on save failed:", result);
      }
    } catch (err) {
      console.error("❌ Error saving try-on metadata:", err);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(resultImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "virtual-tryon-preview.jpg";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("❌ Failed to download the image.");
      console.error(err);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "My Virtual Try-On",
      text: "Check out this outfit I tried on virtually!",
      url: resultImage,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        alert("Image shared successfully!");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(resultImage);
        alert("Sharing not supported. Link copied to clipboard!");
      } catch (err) {
        alert("Failed to copy link. Please try manually.");
      }
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }

    // Close menu if click outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [error]);

  return (
    <div className="try-on-container text-center py-5">
      <br />
      <h2 className="text-gradient mb-4">Virtual Try-On</h2>

      <div className="upload-section d-flex flex-column align-items-center">
        <ImageUploading
          value={userImage}
          onChange={handleUpload}
          acceptType={["jpg", "png", "jpeg"]}
          dataURLKey="data_url"
        >
          {({ onImageUpload }) => (
            <button onClick={onImageUpload} className="upload-btn">
              Upload Your Image
            </button>
          )}
        </ImageUploading>
      </div>

      <div className="image-preview-container d-flex justify-content-center flex-wrap mt-4">
        {selectedOutfit && (
          <div className="image-box mx-3">
            <h4 className="text-center selected-outfit-title">Selected Outfit</h4>
            <img
              src={selectedOutfit}
              alt="Selected Outfit"
              className="try-on-image shadow-lg rounded"
            />
          </div>
        )}

        {userImage && (
          <div className="image-box mx-3">
            <h4 className="text-center selected-outfit-title">Your Image</h4>
            <img
              src={URL.createObjectURL(userImage)}
              alt="Uploaded"
              className="uploaded-image shadow-lg rounded"
            />
          </div>
        )}

        {resultImage && (
          <div className="image-box mx-3 position-relative d-inline-block">
            <h4 className="text-center selected-outfit-title">Try-On Result</h4>
            <img
              src={resultImage}
              alt="Result"
              className="try-on-image shadow-lg rounded"
            />

            <div
              style={{
                position: "absolute",
                top: "40px",
                right: "0",
                zIndex: 10,


              }}
              ref={menuRef}
            >
              <button
                className="btn rounded-circle"
                style={{
                  backgroundColor: "cream",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <FiMoreVertical size={25} color="white" />
              </button>

              {menuOpen && (
                <div
                  className="dropdown-menu show text-start"
                  style={{
                    position: "absolute",
                    top: "35px",
                    right: "0",
                    padding: "8px",
                    minWidth: "180px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    background: "#fff",
                    borderRadius: "0.5rem",
                    zIndex: 20,
                  }}
                >
                  <button className="dropdown-item" onClick={handleDownload}>
                    📥 Download Try-On Image
                  </button>
                  <button className="dropdown-item" onClick={handleShare}>
                    📤 Share
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 👇 3D View Section */}
        {/* {resultImage && (
          <div className="mt-5">
            <h4 className="mb-3">3D View</h4>
            <TryOn3DView imageUrl={resultImage} />
          </div>
        )} */}
      </div>

      <div className="mt-4">
        <button
          onClick={handleTryOn}
          className="try-on-btn"
          disabled={loading}
        >
          {loading ? "Processing..." : "Try On"}
        </button>
      </div>
    </div>
  );
};

export default TryOn;
