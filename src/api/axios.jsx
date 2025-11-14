import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    const json = Object.fromEntries(config.data.entries());
    config.data = JSON.stringify(json);
  }
  return config;
});

export default api;
