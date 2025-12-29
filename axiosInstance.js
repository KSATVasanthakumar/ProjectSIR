// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL: "https://sirApi.findinternship.in",
  baseURL: "https://sirApi.findinternship.in",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
