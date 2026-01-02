// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL: "https://sirApi.findinternship.in",
  baseURL: "https://sirApi.findinternship.in",
  // baseURL: "https://localhost:7097",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
