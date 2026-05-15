import { Link } from "react-router-dom";

const FeatureCard = ({ title, desc, icon }: { title: string; desc: string; icon: string }) => (
  <div className="bg-white rounded-lg shadow p-6 flex gap-4 items-start">
    <div className="text-3xl">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 mt-1">{desc}</p>
    </div>
  </div>
);

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Diamond Bidding System</div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link
            to="/login"
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold">Platform Features</h1>
          <p className="text-gray-700 mt-3 max-w-2xl mx-auto">
            Powerful, secure, and easy-to-use bidding system built for auctions
            and admin management. Learn how it helps buyers and admins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FeatureCard
            icon="🔒"
            title="Secure Authentication"
            desc="JWT-based auth with role checks so admins and users have the right access."
          />
          <FeatureCard
            icon="⚡"
            title="Real-time Bidding"
            desc="Fast and reliable bid placement with accurate highest-bid tracking."
          />
          <FeatureCard
            icon="📊"
            title="Admin Dashboard"
            desc="Manage users, diamonds, and bidding sessions with easy controls."
          />
        </div>

        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">For Buyers</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Browse diamonds with images and details</li>
            <li>Place and track bids using your account</li>
            <li>View bid history and results</li>
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">For Administrators</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Create and manage bidding sessions</li>
            <li>Approve/deactivate users and manage diamonds</li>
            <li>View live bid activity and declare winners</li>
          </ul>
        </section>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Get Started — Login
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Features;
