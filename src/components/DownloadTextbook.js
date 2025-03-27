import React from "react";

const DownloadTextbook = ({ textbook }) => {
  if (!textbook || !textbook.filename) {
    console.warn("Invalid textbook data:", textbook);
    return null;
  }

  const handleDownload = () => {
    if (textbook.filename) {
      window.location.href = `/api/download/${textbook.filename}`;
    } else {
      console.error("Filename missing for textbook:", textbook);
    }
  };

  return (
    <div className="textbook-item">
      <h3>{textbook.title || "Unknown Title"}</h3>
      <p>Uploaded by: {textbook.uploadedBy || "Anonymous"}</p>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default DownloadTextbook;
