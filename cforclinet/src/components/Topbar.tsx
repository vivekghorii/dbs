import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const { name, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-14 bg-white shadow flex items-center justify-between px-6">
      <span className="font-semibold">Welcome, {name}</span>

      <button
        onClick={() => {
          logout();
          // Force a full navigation to the client root to avoid protected-route race
          window.location.href = "/";
        }}
        className="text-sm bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;
