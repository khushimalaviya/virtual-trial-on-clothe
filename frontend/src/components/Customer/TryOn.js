import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import ResultPreview from "./ResultPreview";
import "../../styles/TryOn.css";

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

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className="try-on-container text-center py-5">
      <br/>
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
              // width={100}
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

        <ResultPreview resultImage={resultImage} />
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
