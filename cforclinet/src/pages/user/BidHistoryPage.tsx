import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout";
import {
  getBidHistory,
  type BidHistory,
} from "../../services/userBidService";

const BidHistoryPage = () => {
  const { bidId } = useParams();
  const [history, setHistory] = useState<BidHistory[]>([]);

  useEffect(() => {
    if (bidId) {
      getBidHistory(bidId).then(setHistory);
    }
  }, [bidId]);

  return (
    <UserLayout>
      <h1 className="text-2xl font-bold mb-4">Bid History</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.id} className="border-t">
              <td className="p-3">{h.bidAmount}</td>
              <td className="p-3">
                {new Date(h.editedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </UserLayout>
  );
};

export default BidHistoryPage;
