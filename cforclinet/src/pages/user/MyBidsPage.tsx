import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout";
import { getMyBidResults, type BidResult } from "../../services/userBidService";

const MyBidsPage = () => {
  const [bids, setBids] = useState<BidResult[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBids = async () => {
    try {
      setLoading(true);
      const data = await getMyBidResults();
      setBids(data);
    } catch (error) {
      console.error("Failed to load bids:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBids();
  }, []);

  const getStatusBadge = (status: BidResult["status"]) => {
    switch (status) {
      case "WON":
        return (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            🏆 WON
          </span>
        );
      case "LOST":
        return (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            ❌ LOST
          </span>
        );
      case "PENDING_RESULT":
        return (
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            ⏳ PENDING
          </span>
        );
      case "ACTIVE":
        return (
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            🔵 ACTIVE
          </span>
        );
      case "DRAFT":
        return (
          <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            📝 DRAFT
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading your bids...</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <h1 className="text-2xl font-bold mb-4">My Bids</h1>

      {bids.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-500">
          <p>You haven't placed any bids yet.</p>
          <Link
            to="/user/bids"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            View Active Bids
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bids.map((bid) => (
            <div
              key={bid.bidId}
              className="bg-white p-4 rounded shadow border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{bid.diamondName}</h2>
                {getStatusBadge(bid.status)}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-600">My Bid Amount</p>
                  <p className="text-lg font-bold text-blue-600">
                    ${bid.myBidAmount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Base Bid Price</p>
                  <p className="text-lg font-semibold">${bid.baseBidPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">End Time</p>
                  <p className="text-sm">
                    {new Date(bid.endTime).toLocaleString()}
                  </p>
                </div>
                {bid.winningAmount && (
                  <div>
                    <p className="text-sm text-gray-600">Winning Amount</p>
                    <p className="text-lg font-bold text-green-600">
                      ${bid.winningAmount}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/user/bids/${bid.bidId}/history`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  View Bid History
                </Link>
                {bid.status === "ACTIVE" && (
                  <Link
                    to="/user/bids"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                  >
                    Edit Bid
                  </Link>
                )}
              </div>

              {bid.status === "WON" && (
                <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                  <p className="text-green-800 font-semibold">
                    🎉 Congratulations! You won this bid!
                  </p>
                </div>
              )}

              {bid.status === "LOST" && (
                <div className="mt-4 p-3 bg-red-50 rounded border border-red-200">
                  <p className="text-red-800">
                    You did not win this bid. Better luck next time!
                  </p>
                </div>
              )}

              {bid.status === "PENDING_RESULT" && (
                <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-yellow-800">
                    Bid has ended. Waiting for admin to declare results.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </UserLayout>
  );
};

export default MyBidsPage;
