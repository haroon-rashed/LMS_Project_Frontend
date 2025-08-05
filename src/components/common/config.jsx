export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const userInfo = localStorage.getItem("userInfo");
export const token = userInfo ? JSON.parse(userInfo).token : null;
