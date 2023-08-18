import axios from "axios";
import { getFromLocalStorage } from "../utils";

const API_PREFIX = "/api/v1";

export async function getUser() {
  const accessToken = getFromLocalStorage("accessToken");
  try {
    const response = await axios.get(`${API_PREFIX}/user`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    return {};
  }
}
export async function getUserById(userId) {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await axios.get(`${API_PREFIX}/users/${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
}

export async function createPost(payload) {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await axios.post(`${API_PREFIX}/posts`, payload, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}

export async function updateUser({ nickname, bio }) {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await axios.patch(
    `${API_PREFIX}/user`,
    { nickname, bio },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response;
}
