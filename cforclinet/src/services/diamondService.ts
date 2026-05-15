import api from "./axios";

export interface Diamond {
  id: string;
  name: string;
  baseDiamondPrice: string;
}

export const getDiamonds = async (): Promise<Diamond[]> => {
  const res = await api.get("/admin/diamonds");
  return res.data;
};

export const createDiamond = async (data: {
  name: string;
  baseDiamondPrice: number;
}) => {
  await api.post("/admin/diamonds", data);
};
