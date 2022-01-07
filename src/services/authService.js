import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";
import http from "./httpService";

const tokenKey = "token ";

http.setJwt(getJwt());

export function register(user) {
  let request = {};
  request.user = {};
  request.user.email = user.email;
  request.user.password = user.password;
  request.user.username = user.username;
  return http.post(apiUrl + "/users", request);
}

export async function login(email, password) {
  let request = {};
  request.user = {};
  request.user.email = email;
  request.user.password = password;
  const result = await http.post(apiUrl + "/users/login", request);
  localStorage.setItem(tokenKey, result.data.user.token);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
};
