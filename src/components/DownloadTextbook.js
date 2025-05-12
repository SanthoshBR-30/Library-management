// import React from "react";

// const DownloadTextbook = ({ textbook }) => {
//   if (!textbook || !textbook.filename) {
//     console.warn("Invalid textbook data:", textbook);
//     return null;
//   }

//   const handleDownload = () => {
//     if (textbook.filename) {
//       window.location.href = `/api/download/${textbook.filename}`;
//     } else {
//       console.error("Filename missing for textbook:", textbook);
//     }
//   };

//   return (
//     <div className="textbook-item">
//       <h3>{textbook.filename || "Unknown Title"}</h3>
      
//       <button onClick={handleDownload}>Download</button>
//     </div>
//   );
// };

// export default DownloadTextbook;
// import React from "react";

// const DownloadTextbook = ({ textbook, downloadUrl }) => {
//   const handleDownload = () => {
//     // Open the download URL in a new tab/window
//     window.open(downloadUrl, "_blank");
//   };

//   // Format the upload date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   // Get file extension from original name or filename
//   const getFileExtension = () => {
//     const name = textbook.originalName || textbook.filename;
//     const parts = name.split('.');
//     return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'PDF';
//   };

//   // Get file icon based on file type
//   const getFileIcon = () => {
//     const extension = getFileExtension();
//     switch (extension.toLowerCase()) {
//       case 'pdf':
//         return "📄"; // PDF icon
//       case 'doc':
//       case 'docx':
//         return "📝"; // Document icon
//       case 'ppt':
//       case 'pptx':
//         return "📊"; // Presentation icon
//       default:
//         return "📁"; // Generic file icon
//     }
//   };

//   return (
//     <div className="textbook-card">
//       <div className="textbook-icon">{getFileIcon()}</div>
      
//       <div className="textbook-details">
//         <h4>{textbook.originalName || textbook.filename}</h4>
//         <p className="metadata">
//           <span>Syllabus: {textbook.syllabusScheme}</span>
//           <span>College: {textbook.college}</span>
//           <span>Uploaded: {formatDate(textbook.uploadedAt)}</span>
//         </p>
//       </div>
      
//       <button className="download-button" onClick={handleDownload}>
//         Download
//       </button>
//     </div>
//   );
// };

// export default DownloadTextbook;

// filepath: c:\Users\santh\OneDrive\Desktop\fs project\Library-management\src\components\DownloadTextbook.js
import React from "react";
import axios from "axios";

const DownloadTextbook = ({ textbook,userId }) => {
  const handlePayment = async (priceOption) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payments/create-checkout-session",
        {
          userId, // Pass the actual userId
          textbookId: textbook._id, // Use the textbook's _id as textbookId
          filename: textbook.filename,
          originalName: textbook.originalName,
          priceOption,
        }
      );
      window.location.href = response.data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div className="textbook-item">
      <h4>{textbook.originalName}</h4>
      <button onClick={() => handlePayment("view")}>View Only (₹100)</button>
      <button onClick={() => handlePayment("download")}>Download (₹200)</button>
    </div>
  );
};

export default DownloadTextbook;