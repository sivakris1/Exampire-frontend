import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000/api"
});

/* Attach token automatically */
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
/* ---------- PAPERS ---------- */

export const getPapers = (params) => {
  return API.get("/papers", { params });
};

export const getPaperById = (id) => {
  return API.get(`/papers/${id}`);
};

export const getRelatedPapers = (id) => {
  return API.get(`/papers/${id}/related`);
};

export const logPaperView = (id) => {
  return API.post(`/papers/${id}/view`);
};

export const favoritePaper = (id) => {
  return API.put(`/papers/${id}/favorite`);
};

export const unfavoritePaper = (id) => {
  return API.put(`/papers/${id}/unfavorite`);
};

export const getSavedPapers = () => {
  return API.get("/papers/saved");
};

/* ---------- AUTH ---------- */

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export const registerUser = (data) => {
  return API.post("/auth/signup", data);
};

export default API;