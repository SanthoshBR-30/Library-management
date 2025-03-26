import React from "react";
import { initiatePayment } from "../services/apiService";

const DownloadTextbook = ({ textbook }) => {
  const handleDownload = () => {
    console.log(`Downloading: ${textbook.filename}`);
    // You can implement the actual download logic here
  };

  return (
    <div className="textbook-item">
      <p>{textbook.filename}</p>
      <button className="download-btn" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default DownloadTextbook;


