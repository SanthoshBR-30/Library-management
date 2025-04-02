// import React, { useState } from "react";
// import { uploadTextbook } from "../services/apiService";

// const UploadTextbook = ({ syllabusScheme,college,department,semester, subject }) => {
//   const [file, setFile] = useState(null);

//   const handleUpload = async () => {
//     if (!file) return alert("Select a file first!");
//     await uploadTextbook(file, syllabusScheme,college,department,semester, subject);
//     alert("Upload successful!");
//   };

//   return (
//     <div>
//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default UploadTextbook;

import React, { useState } from "react";
import { uploadTextbook } from "../services/apiService";

const UploadTextbook = ({ syllabusScheme, college, department, semester, subject }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");
    if (file.type !== "application/pdf") return alert("Only PDF files are allowed!");

    try {
      await uploadTextbook(file, syllabusScheme, college, department, semester, subject);
      alert("Upload successful!");
    } catch (error) {
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadTextbook;
