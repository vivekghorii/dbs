import { Link } from "react-router-dom";

const Step = ({ number, title, body }: { number: number; title: string; body: string }) => (
  <div className="flex gap-4 items-start">
    <div className="flex-none w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">{number}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-700 mt-1">{body}</p>
    </div>
  </div>
);

const HowItWorks = () => {
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

      <main className="max-w-5xl mx-auto p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold">How It Works</h1>
          <p className="text-gray-700 mt-3 max-w-2xl mx-auto">
            A clear step-by-step guide to registering, participating in auctions,
            and administering the platform.
          </p>
        </div>

        <section className="space-y-8 mb-8">
          <Step
            number={1}
            title="Create an account"
            body="Register with your email and password. Admins are managed by the platform owner and have elevated access. After registering, verify your account if required and login to access bidding features."
          />

          <Step
            number={2}
            title="Browse diamonds"
            body="Open the 'Active Bids' section to see diamonds currently up for auction. Each diamond shows base price, start/end times, and metadata (quality, carat, images)."
          />

          <Step
            number={3}
            title="Place a bid"
            body="When a bid is active, select the diamond, enter your bid amount (must be higher than current highest), and submit. Your bid is timestamped and recorded in bid history."
          />

          <Step
            number={4}
            title="Real-time updates & highest bid"
            body="The platform tracks the highest bid. When you place a bid that becomes the highest, it will be visible in the item's details. You can view your own bid history from the dashboard."
          />

          <Step
            number={5}
            title="Auction end & winner declaration"
            body="At the auction end, the admin can declare the winner. Winning results are recorded and visible in the results section; participants are notified in the app."
          />

          <Step
            number={6}
            title="Admin actions"
            body="Admins can create diamonds and bidding sessions, manage users (activate/deactivate), view live bids, and declare winners using the admin dashboard."
          />
        </section>

        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tips & Constraints</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Make sure your bid amount is above the current highest bid.</li>
            <li>Active users only: deactivated users cannot place bids.</li>
            <li>Server time determines auction start/end — sync client clock if needed.</li>
            <li>Admins are granted via the admin panel or by the platform owner.</li>
          </ul>
        </section>

        <div className="flex gap-4 justify-center">
          <Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg">Login</Link>
          <Link to="/features" className="px-6 py-3 bg-white border rounded-lg">See features</Link>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;
