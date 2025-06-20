import { apiRequest } from "@/utils/api";

export const signup = async (userData) => {
  return await apiRequest("post", "/auth/signup", userData);
};

export const login = async (userData) => {
  return await apiRequest("post", "/auth/login", userData);
};
