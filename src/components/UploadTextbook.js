import React, { useState } from "react";
import { uploadTextbook } from "../services/apiService";

const UploadTextbook = ({ syllabusScheme, college, department, semester, subject }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }

    try {
      setUploading(true);
      setError(null);
      
      await uploadTextbook(file, syllabusScheme, college, department, semester, subject);
      
      alert("Upload successful!");
      setFile(null);
      // Optionally trigger a refresh of the parent component
    } catch (err) {
      setError("Upload failed: " + (err.message || "Unknown error"));
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h3>Upload a Textbook</h3>
      <p>No textbooks available for {subject} (Semester {semester}). Be the first to upload!</p>
      
      <div className="file-input-container">
        <input 
          type="file" 
          id="textbook-file"
          onChange={(e) => setFile(e.target.files[0])} 
          disabled={uploading}
          accept=".pdf,.doc,.docx,.ppt,.pptx"
        />
        <label htmlFor="textbook-file">
          {file ? file.name : "Choose file"}
        </label>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        className="upload-button"
        onClick={handleUpload} 
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Upload Textbook"}
      </button>
      
      <div className="upload-details">
        <p><strong>Department:</strong> {department}</p>
        <p><strong>Semester:</strong> {semester}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>College:</strong> {college}</p>
        <p><strong>Syllabus Scheme:</strong> {syllabusScheme}</p>
      </div>
    </div>
  );
};

export default UploadTextbook;