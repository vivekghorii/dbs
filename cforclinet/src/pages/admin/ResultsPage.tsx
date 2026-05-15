import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getMonitorBids,
  declareResult,
  type MonitorBid,
} from "../../services/adminMonitorService";
import { getBids, type Bid } from "../../services/bidService";

const ResultsPage = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [selectedBidId, setSelectedBidId] = useState("");
  const [monitor, setMonitor] = useState<MonitorBid | null>(null);

  const loadBids = async () => {
    setBids(await getBids());
  };

  const loadMonitor = async (bidId: string) => {
    const data = await getMonitorBids(bidId);
    setMonitor(data);
  };

  const declareWinner = async () => {
    if (!selectedBidId) return;
    await declareResult(selectedBidId);
    alert("Result declared successfully");
    loadMonitor(selectedBidId);
  };

  useEffect(() => {
    loadBids();
  }, []);

  useEffect(() => {
    if (selectedBidId) loadMonitor(selectedBidId);
  }, [selectedBidId]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Bid Monitoring & Results</h1>

      {/* Select Bid */}
      <select
        className="border p-2 mb-4"
        value={selectedBidId}
        onChange={(e) => setSelectedBidId(e.target.value)}
      >
        <option value="">Select Bid</option>
        {bids.map((b) => (
          <option key={b.id} value={b.id}>
            {b.Diamond.name} ({b.status})
          </option>
        ))}
      </select>

      {/* Monitor Table */}
      {monitor && (
        <>
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold mb-2">
              {monitor.diamondName}
            </h2>
            {monitor.highestBid && (
              <p className="text-green-600 font-bold">
                Highest Bid: ${monitor.highestBid}
              </p>
            )}
          </div>
          <table className="w-full bg-white shadow rounded mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Bid Amount</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {monitor.bids.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-3 text-center text-gray-500">
                    No bids placed yet
                  </td>
                </tr>
              ) : (
                monitor.bids.map((b) => (
                  <tr
                    key={b.userId}
                    className={`border-t ${
                      monitor.highestBid &&
                      b.bidAmount === monitor.highestBid
                        ? "bg-green-100 font-bold"
                        : ""
                    }`}
                  >
                    <td className="p-3">{b.userName}</td>
                    <td className="p-3">${b.bidAmount}</td>
                    <td className="p-3">
                      {monitor.highestBid && b.bidAmount === monitor.highestBid
                        ? "🏆 Highest"
                        : ""}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Declare Button */}
          {!monitor.isResultDeclared && (
            <button
              onClick={declareWinner}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Declare Winner
            </button>
          )}

          {monitor.isResultDeclared && (
            <p className="text-green-600 font-semibold">
              Result already declared
            </p>
          )}
        </>
      )}
    </AdminLayout>
  );
};

export default ResultsPage;
