import axios from "axios";

const API_PREFIX = "api/v1";

export async function getUser() {
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.get(`${API_PREFIX}/user`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
}

export async function createPost(payload) {
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.post(`${API_PREFIX}/posts`, payload, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}
