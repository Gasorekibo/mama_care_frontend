import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  if (!token) return true;
  const decoded = jwtDecode(token);
  return decoded.exp < Date.now();
}
