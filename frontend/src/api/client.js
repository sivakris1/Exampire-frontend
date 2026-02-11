import axios from "axios";

const API_BASE_URL = "http://localhost:9000/api";

export const getPapers = (params) => {
  return axios.get(`${API_BASE_URL}/papers`,{params});
};

export const getPaperById = (id) => {
  return axios.get(`${API_BASE_URL}/papers/${id}`);
};

export const favoritePaper = (id) => {
  return axios.put(`${API_BASE_URL}/papers/${id}/favorite`);
};

export const unfavoritePaper = (id) => {
  return axios.put(`${API_BASE_URL}/papers/${id}/unfavorite`);
};

