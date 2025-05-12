

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

// Set the workerSrc to the local worker file in the public directory
pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.mjs`;

const PdfViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pdfFile } = location.state || {}; // Get the PDF file URL from state

  const [numPages, setNumPages] = useState(null); // Track the total number of pages

  if (!pdfFile) {
    return <p>No PDF file to display.</p>;
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages); // Set the total number of pages
  };

  return (
    <div className="pdf-viewer-container" style={{  display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",padding: "20px" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "10px" }}>
        Back
      </button>
      <div className="pdf-container" style={{ border: "1px solid #ccc", padding: "10px" }}>
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error("Error loading PDF:", error)}
        >
          {/* Render all pages dynamically */}
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={600} // Adjust the width of the page
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;

