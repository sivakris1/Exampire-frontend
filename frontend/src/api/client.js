import axios from "axios";

const API_BASE_URL = "http://localhost:9000/api";

export const getPapers = () => {
  return axios.get(`${API_BASE_URL}/papers`);
};

export const getPaperById = (id) => {
  return axios.get(`${API_BASE_URL}/papers/${id}`);
};
