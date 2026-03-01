import { getrolesFromJwt } from "../utils";
import { useAccessToken } from "./useAccessToken";
import type { JwtData } from "../types";
import { jwtDecode } from "jwt-decode";

export function useAccount() {
  const { accessToken } = useAccessToken();

  const data = accessToken ? jwtDecode<JwtData>(accessToken) : null;
  const roles = getrolesFromJwt(data);
  const isAdmin = roles.includes("Admin");

  return { data, roles, isAdmin };
}