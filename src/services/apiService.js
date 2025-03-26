import axios from "axios";

export const getTextbooks = async (semester, subject) => {
  return axios.get(`/api/textbooks?semester=${semester}&subject=${subject}`);
};

export const uploadTextbook = async (file, semester, subject) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("semester", semester);
    formData.append("subject", subject);

    const response = await axios.post("http://localhost:5000/api/textbooks/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Upload failed:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const initiatePayment = async (textbookId) => {
  return axios.post("/api/paytm/initiate-payment", { textbookId });
};
