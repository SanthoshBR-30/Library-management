import axios from "axios";

// export const getTextbooks = async (semester, subject) => {
//   return axios.get(`/api/textbooks?semester=${semester}&subject=${subject}`);
// };


// export const uploadTextbook = async (file, syllabusScheme, college, department, semester, subject) => {
//   const formData = new FormData();
//   formData.append("textbook", file);
//   formData.append("syllabusScheme", syllabusScheme || "");
//   formData.append("college", college || "");
//   formData.append("department", department || "");
//   formData.append("semester", semester || "");
//   formData.append("subject", subject || "");

//   try {
//     console.log("Attempting to upload to:", "http://localhost:5000/api/textbooks/upload");
//     console.log("Upload data:", {
//       file: file.name,
//       syllabusScheme,
//       college,
//       department,
//       semester,
//       subject
//     });
    
//     const response = await fetch("http://localhost:5000/api/textbooks/upload", {
//       method: "POST",
//       body: formData,
//       // Don't set Content-Type header - the browser will set it with the boundary parameter
//     });
    
//     if (!response.ok) {
//       const errorData = await response.json().catch(() => null);
//       console.error("Server responded with error:", response.status, errorData);
//       throw new Error(`Server error: ${response.status}`);
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error("Upload failed:", error);
//     throw error;
//   }
// };

export const uploadTextbook = async (file, syllabusScheme, college, department, semester, subject) => {
  const formData = new FormData();
  formData.append("textbook", file);
  formData.append("syllabusScheme", syllabusScheme || "");
  formData.append("college", college || "");
  formData.append("department", department || "");
  formData.append("semester", semester || "");
  formData.append("subject", subject || "");

  try {
    const response = await fetch("http://localhost:5000/api/textbooks/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Server responded with error:", response.status, errorData);
      throw new Error(`Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

// Fetch textbooks
export const getTextbooks = async () => {
  return fetch("http://localhost:5000/api/textbooks")
    .then((res) => res.json())
    .catch((error) => console.error("Error fetching textbooks:", error));
};

// Fetch a PDF file by filename
export const getTextbookFile = async (filename) => {
  return fetch(`http://localhost:5000/api/textbooks/file/${filename}`)
    .then((res) => res.blob()) // Convert response to blob for PDFs
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url); // Open in a new tab
    })
    .catch((error) => console.error("Error fetching file:", error));
};


export const initiatePayment = async (textbookId) => {
  return axios.post("/api/paytm/initiate-payment", { textbookId });
};


