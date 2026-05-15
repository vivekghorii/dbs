import api from "./axios";

export interface UserBid {
  userId: string;
  userName: string;
  bidAmount: string;
}

export interface MonitorBid {
  bidId: string;
  diamondName: string;
  bids: UserBid[];
  highestBid: string;
  isResultDeclared: boolean;
}

export const getMonitorBids = async (bidId: string): Promise<MonitorBid> => {
  const res = await api.get(`/admin/monitor/bids/${bidId}`);
  return res.data;
};

export const declareResult = async (bidId: string) => {
  await api.post(`/admin/monitor/bids/${bidId}/declare`);
};
