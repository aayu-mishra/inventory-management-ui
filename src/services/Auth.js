import api from "./api";

const AUTH_TOKEN_KEY = "authToken";

export const login = async (username, password) => {
  const response = await api.post("/auth/login", { username, password });
  const token = response.data.token;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  return token;
};

export const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};