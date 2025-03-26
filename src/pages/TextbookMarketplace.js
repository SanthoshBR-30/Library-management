import React, { useState, useEffect } from "react";
import { getTextbooks } from "../services/apiService";
import UploadTextbook from "../components/UploadTextbook";
import DownloadTextbook from "../components/DownloadTextbook";
import "../styles.css";


const TextbookMarketplace = () => {
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [textbooks, setTextbooks] = useState([]);

  // Handle semester selection
  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
    setSubject(""); // Reset subject when semester changes
  };

  // Handle subject selection
  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  // Fetch textbooks when semester and subject are selected
  useEffect(() => {
    if (semester && subject) {
      fetch(`/api/textbooks?semester=${semester}&subject=${subject}`)
        .then((res) => res.json())
        .then((data) => setTextbooks(data))
        .catch((err) => console.error("Error fetching textbooks:", err));
    }
  }, [semester, subject]);

  return (
    <div className="container">
      <h2>Textbook Marketplace</h2>

      {/* Semester Selection */}
      <label>Select Semester:</label>
      <select value={semester} onChange={handleSemesterChange}>
        <option value="">-- Select Semester --</option>
        <option value="1">Semester 1</option>
        <option value="2">Semester 2</option>
        <option value="3">Semester 3</option>
        <option value="4">Semester 4</option>
        <option value="5">Semester 5</option>
        <option value="6">Semester 6</option>
        <option value="7">Semester 7</option>
        <option value="8">Semester 8</option>
      </select>

      {/* Subject Selection */}
      {semester && (
        <>
          <label>Select Subject:</label>
          <select value={subject} onChange={handleSubjectChange}>
            <option value="">-- Select Subject --</option>
            <option value="math">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="cs">Computer Science</option>
          </select>
        </>
      )}

    
      {subject &&
        (textbooks.length > 0 ? (
          textbooks.map((book) => (
            <DownloadTextbook key={book._id} textbook={book} />
          ))
        ) : (
          <UploadTextbook semester={semester} subject={subject} />
        ))}
    </div>
  );
};

export default TextbookMarketplace;



  