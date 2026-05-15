import api from "./axios";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  isActive: boolean;
}

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const toggleUserStatus = async (userId: string) => {
  await api.patch(`/admin/users/${userId}/status`);
};
export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
}) => {
  await api.post("/admin/users", data);
};
