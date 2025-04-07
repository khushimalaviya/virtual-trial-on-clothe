import React from "react";
import "../../styles/TryOn.css";

const ResultPreview = ({ resultImage }) => {
  if (!resultImage) return null;

  return (
    <div>
      <h4 className="text-center selected-outfit-title" >Trial Result</h4>
      <img
        src={resultImage}  // Use the full URL from Flask
        alt="Trial Result"
        style={{ width: "300px", border: "2px solid black" }}
        className="uploaded-image shadow-lg rounded"
      />
    </div>
  );
};

export default ResultPreview;
