import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import {
  getActiveBids,
  placeBid,
  type ActiveBid,
} from "../../services/userBidService";
import CountdownTimer from "../../components/CountdownTimer";

const ActiveBidsPage = () => {
  const [bids, setBids] = useState<ActiveBid[]>([]);
  const [amounts, setAmounts] = useState<Record<string, string>>({});

  const loadBids = async () => {
    const data = await getActiveBids();
    setBids(data);
    // Pre-fill amounts with current bids
    const currentAmounts: Record<string, string> = {};
    data.forEach((bid) => {
      if (bid.currentBidAmount) {
        currentAmounts[bid.id] = bid.currentBidAmount;
      }
    });
    setAmounts(currentAmounts);
  };

  const submit = async (bidId: string) => {
    const amount = Number(amounts[bidId]);
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid bid amount");
      return;
    }

    // Find the bid to validate against base price
    const bid = bids.find((b) => b.id === bidId);
    if (bid) {
      const basePrice = Number(bid.baseBidPrice);
      if (amount < basePrice) {
        alert(
          `Bid amount must be at least $${basePrice.toFixed(2)} (base bid price)`
        );
        return;
      }
    }

    try {
      await placeBid({ bidId, amount });
      alert("Bid submitted successfully!");
      loadBids();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to submit bid";
      alert(`Error: ${errorMessage}`);
    }
  };

  useEffect(() => {
    loadBids();
    // Refresh bids every 30 seconds to update countdown and check for new bids
    const interval = setInterval(loadBids, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <UserLayout>
      <h1 className="text-2xl font-bold mb-4">Active Bids</h1>

      {bids.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-500">
          <p>No active bids available at the moment.</p>
          <p className="text-sm mt-2">Check back later for new bidding opportunities.</p>
        </div>
      ) : (
        bids.map((b) => (
        <div
          key={b.id}
          className="bg-white p-4 rounded shadow mb-4"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="font-semibold text-xl">{b.Diamond.name}</h2>
              <p className="text-gray-600">Base Price: ${b.baseBidPrice}</p>
              {b.currentBidAmount && (
                <p className="text-green-600 font-semibold mt-1">
                  Your Current Bid: ${b.currentBidAmount}
                </p>
              )}
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>Ends: {new Date(b.endTime).toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-3">
            <CountdownTimer
              endTime={b.endTime}
              startTime={b.startTime}
            />
          </div>

          <div className="mt-2">
            <input
              type="number"
              className="border p-2 mr-2"
              placeholder="Enter your bid amount"
              value={amounts[b.id] || ""}
              onChange={(e) =>
                setAmounts({ ...amounts, [b.id]: e.target.value })
              }
              min={b.baseBidPrice}
            />

            <button
              onClick={() => submit(b.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Place / Update Bid
            </button>
          </div>
        </div>
        ))
      )}
    </UserLayout>
  );
};

export default ActiveBidsPage;
