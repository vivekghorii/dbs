import api from "./axios";

export interface Bid {
  id: string;
  baseBidPrice: string;
  startTime: string;
  endTime: string;
  status: string;
  Diamond: {
    name: string;
  };
}

export const getBids = async (): Promise<Bid[]> => {
  const res = await api.get("/admin/bids");
  return res.data;
};

export const createBid = async (data: {
  diamondId: string;
  baseBidPrice: number;
  startTime: string;
  endTime: string;
}) => {
  await api.post("/admin/bids", data);
};

export const updateBidStatus = async (bidId: string, status: string) => {
  await api.put(`/admin/bids/${bidId}/status`, { status });
};

export interface DashboardBid {
  id: string;
  diamondName: string;
  baseBidPrice: string;
  startTime: string;
  endTime: string;
  status: string;
  totalBids: number;
  userBids: {
    userId: string;
    userName: string;
    userEmail: string;
    bidAmount: string;
  }[];
  highestBid: string | null;
  highestBidUser: string | null;
  isResultDeclared: boolean;
  winnerUserId: string | null;
  winningAmount: string | null;
}

export const getDashboardBids = async (): Promise<DashboardBid[]> => {
  const res = await api.get("/admin/bids/dashboard");
  return res.data;
};
