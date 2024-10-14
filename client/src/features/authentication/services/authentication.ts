import { baseApi } from "@/features/services/baseApi";

const signup = (email, password) => {
  return baseApi
    .post("users/signup", { email, password })
    .then((res) => res.data);
};

const login = (email, password) => {
  return baseApi
    .post("users/login", { email, password })
    .then((res) => res.data);
};

const logout = () => {
  return baseApi.delete("users/logout");
};

const getLoggedInUser = () => {
  return baseApi.get("users/session").then((res) => res.data ?? undefined);
};

export { login, signup, logout, getLoggedInUser };
