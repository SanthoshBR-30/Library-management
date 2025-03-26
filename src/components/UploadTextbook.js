import React, { useState } from "react";
import { uploadTextbook } from "../services/apiService";

const UploadTextbook = ({ semester, subject }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");
    await uploadTextbook(file, semester, subject);
    alert("Upload successful!");
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadTextbook;
