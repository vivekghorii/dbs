import api from "./axios";

export interface ActiveBid {
  id: string;
  baseBidPrice: string;
  startTime: string;
  endTime: string;
  Diamond: {
    name: string;
  };
  currentBidAmount: string | null;
}

export interface BidHistory {
  id: string;
  bidAmount: string;
  editedAt: string;
}

export interface BidResult {
  bidId: string;
  diamondName: string;
  myBidAmount: string;
  baseBidPrice: string;
  endTime: string;
  status: "WON" | "LOST" | "PENDING_RESULT" | "ACTIVE" | "DRAFT";
  isWinner: boolean;
  winningAmount: string | null;
}

export const getActiveBids = async (): Promise<ActiveBid[]> => {
  const res = await api.get("/user/bids/active");
  return res.data;
};

export const placeBid = async (data: {
  bidId: string;
  amount: number;
}) => {
  await api.post("/user/bids", data);
};

export const getBidHistory = async (
  bidId: string
): Promise<BidHistory[]> => {
  const res = await api.get(`/user/bids/${bidId}/history`);
  return res.data;
};

export const getMyBidResults = async (): Promise<BidResult[]> => {
  const res = await api.get("/user/bids/results");
  return res.data;
};
