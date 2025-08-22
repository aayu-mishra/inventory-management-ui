import axios from "axios";
import { getToken } from "./Auth";

const api = axios.create({
  baseURL: "http://localhost:8080/v1/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;