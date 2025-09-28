import axios from "axios";

let rawBase = import.meta.env.VITE_API_URL;

// If running in production and using relative "/api",
// resolve it against the current site domain (window.location.origin)
if (rawBase?.startsWith("/")) {
  rawBase = `${window.location.origin}${rawBase}`;
}

// Default fallback (development)
const BASE_URL = (rawBase || "http://localhost:5047").replace(/\/+$/, "");

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

export const absoluteUrl = (path = "") =>
  path ? `${BASE_URL}/${String(path).replace(/^\/+/, "")}` : BASE_URL;

export default api;
