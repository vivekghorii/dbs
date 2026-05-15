import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "ADMIN") navigate("/admin", { replace: true });
      else navigate("/user", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 🔴 VERY IMPORTANT
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await login(email, password);

      const role = localStorage.getItem("role");
      if (role === "ADMIN") navigate("/admin", { replace: true });
      else navigate("/user", { replace: true });
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <div className="absolute inset-0 -z-0">
        <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-violet-500/20 p-10">
            <div>
              <p className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold tracking-wider text-cyan-200">
                DIAMOND BIDDING SYSTEM
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-white">
                Welcome back
              </h1>
              <p className="mt-3 text-sm text-slate-200/80 leading-6">
                Securely sign in to manage bids, track live auctions, and view
                real-time results.
              </p>
            </div>

            <ul className="space-y-4 text-sm text-slate-100/90">
              <li className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-300/20 text-cyan-200">
                  ✓
                </span>
                Role-based access for Admin and Users
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-300/20 text-cyan-200">
                  ✓
                </span>
                Transparent bidding with full history
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-300/20 text-cyan-200">
                  ✓
                </span>
                Secure JWT-protected login
              </li>
            </ul>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <p className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold tracking-wider text-cyan-200">
                  DIAMOND BIDDING SYSTEM
                </p>
              </div>

              <h2 className="text-3xl font-bold text-white">Sign in</h2>
              <p className="mt-2 text-sm text-slate-300">
                Enter your credentials to continue.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {error && (
                  <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/30"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/30"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-700/25 transition hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
