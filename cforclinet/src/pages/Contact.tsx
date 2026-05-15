import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/axios";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<null | "idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return setStatus("error");

    setStatus("sending");
    try {
      const res = await api.post("/contact", { name, email, message });
      if (res.data && res.data.message) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Diamond Bidding System</div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link to="/features" className="text-gray-700 hover:text-gray-900">Features</Link>
          <Link to="/login" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Login</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-gray-700 mb-6">Have questions or need help? Send us a message and we'll respond as soon as possible.</p>

        <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full border px-3 py-2 rounded h-32"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "sent" && <span className="text-green-600">Message sent — we will reply soon.</span>}
            {status === "error" && <span className="text-red-600">Please fill all fields.</span>}
          </div>
        </form>

        <section className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Other ways to reach us</h2>
          <p className="text-gray-700">Email: support@example.com</p>
          <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
        </section>
      </main>
    </div>
  );
};

export default Contact;
