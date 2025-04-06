import axios from "axios";

export const axiosInstancerp = axios.create({
  baseURL: "http://127.0.0.1:5002", // Base URL for the Report.py backend
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data", // Fix #4: Setting the correct Content-Type for file uploads
  },
});

// Fix #5: Add interceptors to handle errors
axiosInstancerp.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
