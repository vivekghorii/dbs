import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getUsers,
  toggleUserStatus,
  createUser,
  type User,
} from "../../services/adminUserService";

const UsersPage = () => {
  // ✅ Hooks MUST be here (top-level)
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "USER">("USER");

  const loadUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  const submitUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({ name, email, password, role });
    setName("");
    setEmail("");
    setPassword("");
    setRole("USER");
    loadUsers();
  };

  const toggleStatus = async (id: string) => {
    await toggleUserStatus(id);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Create User */}
      <form
        onSubmit={submitUser}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <h2 className="font-semibold mb-3">Create User</h2>

        <div className="flex gap-2 flex-wrap">
          <input
            className="border p-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="border p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="border p-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            className="border p-2"
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button className="bg-blue-600 text-white px-4 rounded">
            Create
          </button>
        </div>
      </form>

      {/* Users Table */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">
                  {u.isActive ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Inactive</span>
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => toggleStatus(u.id)}
                    className={`px-3 py-1 rounded text-white ${
                      u.isActive ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {u.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
};

export default UsersPage;
