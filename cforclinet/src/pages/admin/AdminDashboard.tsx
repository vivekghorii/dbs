import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getDashboardBids,
  type DashboardBid,
} from "../../services/bidService";
import CountdownTimer from "../../components/CountdownTimer";

const AdminDashboard = () => {
  const [bids, setBids] = useState<DashboardBid[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBids = async () => {
    try {
      setLoading(true);
      const data = await getDashboardBids();
      setBids(data);
    } catch (error) {
      console.error("Failed to load dashboard bids:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBids();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
            ACTIVE
          </span>
        );
      case "CLOSED":
        return (
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-semibold">
            CLOSED
          </span>
        );
      case "DRAFT":
        return (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-semibold">
            DRAFT
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
            {status}
          </span>
        );
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            View current bid status and manage the system.
          </p>
        </div>
        <button
          onClick={loadBids}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading bid status...</p>
        </div>
      ) : bids.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-500">
          <p>No bids found. Create a bid to get started.</p>
          <Link
            to="/admin/bids"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Go to Bids
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bids.map((bid) => (
            <div
              key={bid.id}
              className="bg-white p-4 rounded shadow border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-xl font-semibold">{bid.diamondName}</h2>
                  <p className="text-sm text-gray-600">
                    Base Price: ${bid.baseBidPrice}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Start: {new Date(bid.startTime).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    End: {new Date(bid.endTime).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  {getStatusBadge(bid.status)}
                </div>
              </div>

              {bid.status === "ACTIVE" && (
                <div className="mb-4">
                  <CountdownTimer
                    endTime={bid.endTime}
                    startTime={bid.startTime}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Total Bids</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {bid.totalBids}
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Highest Bid</p>
                  <p className="text-2xl font-bold text-green-600">
                    {bid.highestBid ? `$${bid.highestBid}` : "N/A"}
                  </p>
                  {bid.highestBidUser && (
                    <p className="text-xs text-gray-600 mt-1">
                      by {bid.highestBidUser}
                    </p>
                  )}
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-lg font-semibold text-purple-600">
                    {bid.isResultDeclared
                      ? "Result Declared"
                      : bid.status === "ACTIVE"
                      ? "Bidding Active"
                      : "Not Active"}
                  </p>
                </div>
              </div>

              {bid.userBids.length > 0 ? (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">User Bids:</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 text-left">User</th>
                          <th className="p-2 text-left">Email</th>
                          <th className="p-2 text-left">Bid Amount</th>
                          <th className="p-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bid.userBids.map((userBid, index) => (
                          <tr
                            key={userBid.userId}
                            className={`border-t ${
                              bid.highestBid &&
                              userBid.bidAmount === bid.highestBid
                                ? "bg-green-50 font-semibold"
                                : ""
                            }`}
                          >
                            <td className="p-2">{userBid.userName}</td>
                            <td className="p-2 text-gray-600">
                              {userBid.userEmail}
                            </td>
                            <td className="p-2 font-semibold">
                              ${userBid.bidAmount}
                            </td>
                            <td className="p-2">
                              {bid.highestBid &&
                              userBid.bidAmount === bid.highestBid ? (
                                <span className="text-green-600 font-bold">
                                  🏆 Highest
                                </span>
                              ) : (
                                <span className="text-gray-500">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-3 bg-gray-50 rounded text-center text-gray-500">
                  <p>No bids placed yet</p>
                </div>
              )}

              {bid.isResultDeclared && bid.winnerUserId && (
                <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                  <p className="text-green-800 font-semibold">
                    🏆 Winner:{" "}
                    {bid.userBids.find((ub) => ub.userId === bid.winnerUserId)
                      ?.userName || "Unknown"}{" "}
                    - Winning Amount: ${bid.winningAmount}
                  </p>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/admin/results`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
