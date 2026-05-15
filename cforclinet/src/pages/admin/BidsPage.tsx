import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getBids,
  createBid,
  updateBidStatus,
  type Bid,
} from "../../services/bidService";
import { getDiamonds, type Diamond } from "../../services/diamondService";

const BidsPage = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [diamondId, setDiamondId] = useState("");
  const [baseBidPrice, setBaseBidPrice] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const loadData = async () => {
    setBids(await getBids());
    setDiamonds(await getDiamonds());
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBid({
      diamondId,
      baseBidPrice: Number(baseBidPrice),
      startTime,
      endTime,
    });
    setDiamondId("");
    setBaseBidPrice("");
    setStartTime("");
    setEndTime("");
    loadData();
  };

  const handleActivate = async (bidId: string) => {
    await updateBidStatus(bidId, "ACTIVE");
    alert("Bid activated successfully");
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Bids</h1>

      {/* Create Bid */}
      <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Create Bid</h2>

        <select
          className="border p-2 mr-2"
          value={diamondId}
          onChange={(e) => setDiamondId(e.target.value)}
        >
          <option value="">Select Diamond</option>
          {diamonds.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Base Bid Price"
          value={baseBidPrice}
          onChange={(e) => setBaseBidPrice(e.target.value)}
        />

        <input
          type="datetime-local"
          className="border p-2 mr-2"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <input
          type="datetime-local"
          className="border p-2 mr-2"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      {/* Bids List */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Diamond</th>
            <th className="p-3 text-left">Base Bid</th>
            <th className="p-3 text-left">Start</th>
            <th className="p-3 text-left">End</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="p-3">{b.Diamond.name}</td>
              <td className="p-3">${b.baseBidPrice}</td>
              <td className="p-3">{new Date(b.startTime).toLocaleString()}</td>
              <td className="p-3">{new Date(b.endTime).toLocaleString()}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-sm font-semibold ${
                    b.status === "ACTIVE"
                      ? "bg-green-100 text-green-800"
                      : b.status === "CLOSED"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {b.status}
                </span>
              </td>
              <td className="p-3">
                {b.status === "DRAFT" && (
                  <button
                    onClick={() => handleActivate(b.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default BidsPage;
