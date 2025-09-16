import axios from "./axiosInstance";

export const registerUser = async (data: {
  email: string;
  fullName: { firstName: string; lastName: string };
  password: string;
}) => {
  const res = await axios.post("/user/register", data);
  return res.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axios.post("/user/login", data);
  return res.data;
};

export const getUserProfile = async () => {
  const res = await axios.get("/user/profile");
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  return res.data;
};
