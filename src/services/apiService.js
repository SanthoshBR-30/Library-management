// import axios from "axios";



// export const uploadTextbook = async (file, syllabusScheme, college, department, semester, subject) => {
//   const formData = new FormData();
//   formData.append("textbook", file);
//   formData.append("syllabusScheme", syllabusScheme || "");
//   formData.append("college", college || "");
//   formData.append("department", department || "");
//   formData.append("semester", semester || "");
//   formData.append("subject", subject || "");

//   try {
//     const response = await fetch("http://localhost:5000/api/textbooks/upload", {
//       method: "POST",
//       body: formData,
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

// // Fetch textbooks
// export const getTextbooks = async () => {
//   return fetch("http://localhost:5000/api/textbooks")
//     .then((res) => res.json())
//     .catch((error) => console.error("Error fetching textbooks:", error));
// };

// // Fetch a PDF file by filename
// export const getTextbookFile = async (filename) => {
//   return fetch(`http://localhost:5000/api/textbooks/file/${filename}`)
//     .then((res) => res.blob()) // Convert response to blob for PDFs
//     .then((blob) => {
//       const url = URL.createObjectURL(blob);
//       window.open(url); // Open in a new tab
//     })
//     .catch((error) => console.error("Error fetching file:", error));
// };


// export const initiatePayment = async (textbookId) => {
//   return axios.post("/api/paytm/initiate-payment", { textbookId });
// };


import axios from "axios";

// Define the API base URL - make sure this matches your server address
const API_BASE_URL = " ";

export const getTextbooks = async (syllabusScheme, college, department, semester, subject) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/textbooks`, {
      params: { syllabusScheme, college, department, semester, subject }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching textbooks:", error);
    // Extract meaningful error message
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("Server is not responding. Please check if the backend server is running.");
    } else {
      // Something happened in setting up the request
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export const uploadTextbook = async (file, syllabusScheme, college, department, semester, subject) => {
  const formData = new FormData();
  formData.append("textbook", file);
  formData.append("syllabusScheme", syllabusScheme || "");
  formData.append("college", college || "");
  formData.append("department", department || "");
  formData.append("semester", semester || "");
  formData.append("subject", subject || "");

  try {
    console.log("Uploading textbook:", {
      file: file.name,
      syllabusScheme,
      college,
      department,
      semester,
      subject
    });
    
    const response = await axios.post(`${API_BASE_URL}/api/textbooks/upload`, formData, {
      headers: {
        // Don't set Content-Type manually, let axios set it with boundary
        // 'Accept': 'application/json',
        method: "POST",
        body: formData,
      },
      // Needed for cross-origin requests with credentials
      withCredentials: true
    });
    
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      throw new Error("Server is not responding. Please check if the backend server is running.");
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export const initiatePayment = async (textbookId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/paytm/initiate-payment`, { textbookId });
    return response.data;
  } catch (error) {
    console.error("Payment initiation failed:", error);
    throw error;
  }
};