import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    if (error.response) {
      throw new Error(
        error.response.data?.detail ||
        "Server Error"
      );
    }

    throw new Error("Cannot connect to server.");
  }
);

export default api;