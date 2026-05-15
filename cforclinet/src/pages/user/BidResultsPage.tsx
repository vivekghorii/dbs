import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import { getMyBidResults, type BidResult } from "../../services/userBidService";

const BidResultsPage = () => {
  const [results, setResults] = useState<BidResult[]>([]);

  const loadResults = async () => {
    const data = await getMyBidResults();
    setResults(data);
  };

  useEffect(() => {
    loadResults();
  }, []);

  const getStatusBadge = (status: BidResult["status"], isWinner: boolean) => {
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

  return (
    <UserLayout>
      <h1 className="text-2xl font-bold mb-4">My Bid Results</h1>

      {results.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-500">
          <p>You haven't placed any bids yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.bidId}
              className="bg-white p-4 rounded shadow border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{result.diamondName}</h2>
                {getStatusBadge(result.status, result.isWinner)}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-600">My Bid Amount</p>
                  <p className="text-lg font-bold text-blue-600">
                    ${result.myBidAmount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Base Bid Price</p>
                  <p className="text-lg font-semibold">${result.baseBidPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">End Time</p>
                  <p className="text-sm">
                    {new Date(result.endTime).toLocaleString()}
                  </p>
                </div>
                {result.winningAmount && (
                  <div>
                    <p className="text-sm text-gray-600">Winning Amount</p>
                    <p className="text-lg font-bold text-green-600">
                      ${result.winningAmount}
                    </p>
                  </div>
                )}
              </div>

              {result.status === "WON" && (
                <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                  <p className="text-green-800 font-semibold">
                    🎉 Congratulations! You won this bid!
                  </p>
                </div>
              )}

              {result.status === "LOST" && (
                <div className="mt-4 p-3 bg-red-50 rounded border border-red-200">
                  <p className="text-red-800">
                    You did not win this bid. Better luck next time!
                  </p>
                </div>
              )}

              {result.status === "PENDING_RESULT" && (
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

export default BidResultsPage;
