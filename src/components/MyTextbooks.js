

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.mjs`;

const MyTextbooks = () => {
  const [textbooks, setTextbooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTextbooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/my-textbooks", { withCredentials: true });
        setTextbooks(response.data);
      } catch (error) {
        console.error("Error fetching purchased textbooks:", error);
        alert("Failed to fetch purchased textbooks. Please try again.");
      }
    };

    fetchTextbooks();
  }, []);

  const handleView = (filename) => {
    navigate("/view-pdf", { state: { pdfFile: `http://localhost:5000/uploads/${filename}` } });
  };
const mysTyles ={
  button: {
    width: "100%",
    padding: "0.8rem",
    backgroundColor: "#0066cc",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#005bb5",
  }

}
  return (
    <div>
      <h2>My Textbooks</h2>
      {textbooks.length === 0 ? (
        <p>You have not purchased any textbooks yet.</p>
         ) : (
        <div >
          {textbooks.map((textbook, index) => ( // Add `index` as a fallback for unique keys
            <div key={`${textbook.textbookId._id}-${index}`} className="textbook-item">
              <h4>{textbook.textbookId.originalName}</h4>
              
              {textbook.type === "download" ? (
                <a href={`http://localhost:5000/uploads/${textbook.textbookId.filename}`} download>
                  Download
                </a>
              ) : (
                 <button onClick={() => handleView(textbook.textbookId.filename)}>View</button>
               
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTextbooks;




