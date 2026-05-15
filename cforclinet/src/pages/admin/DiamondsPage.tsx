import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getDiamonds,
  createDiamond,
  type Diamond,
} from "../../services/diamondService";

const DiamondsPage = () => {
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const loadDiamonds = async () => {
    const data = await getDiamonds();
    setDiamonds(data);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDiamond({
      name,
      baseDiamondPrice: Number(price),
    });
    setName("");
    setPrice("");
    loadDiamonds();
  };

  useEffect(() => {
    loadDiamonds();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Diamonds</h1>

      {/* Create Diamond */}
      <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Create Diamond</h2>

        <input
          className="border p-2 mr-2"
          placeholder="Diamond Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="border p-2 mr-2"
          placeholder="Base Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      {/* Diamonds List */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Base Price</th>
          </tr>
        </thead>
        <tbody>
          {diamonds.map((d) => (
            <tr key={d.id} className="border-t">
              <td className="p-3">{d.name}</td>
              <td className="p-3">{d.baseDiamondPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default DiamondsPage;
