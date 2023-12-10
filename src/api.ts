import axios from "axios";

// Create an instance of Axios with default configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:7000", // Replace with your API base URL
  timeout: 5000, // Set a timeout for requests (in milliseconds)
});

// Request interceptor to handle errors globally
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization header with token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token.replace(/"/g, "")}`;
    }

    // You can modify the request configuration here
    return config;
  },
  (error) => {
    // Handle request errors
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response here
    return response;
  },
  (error) => {
    // Handle response errors
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
