// src/config.js
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://vacancy-oa9h.onrender.com/api"
    : "http://localhost:5000/api";

export default BASE_URL;
