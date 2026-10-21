import axios from "axios";

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api" });
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("studyguard_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
client.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("studyguard_token");
    window.dispatchEvent(new Event("studyguard:unauthorized"));
  }
  return Promise.reject(error);
});
export default client;
