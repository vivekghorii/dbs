import { Link } from "react-router-dom";

type Auction = {
  id: number;
  title: string;
  basePrice: number;
  highest: number;
  location: string;
  endIn: string;
  totalBids: number;
  image?: string;
};

const FeaturedAuctionCard = ({ a }: { a: Auction }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 transition duration-300 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 to-blue-600/0 opacity-0 transition duration-300 group-hover:opacity-10" />
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
        {a.image ? (
          <img
            src={a.image}
            alt={a.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="grid h-full place-items-center text-slate-500">
            <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 rounded-lg bg-red-500/80 px-3 py-1 text-xs font-semibold text-white">LIVE</div>
      </div>

      <div className="relative p-6">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-base font-bold text-white line-clamp-2">{a.title}</h3>
            <p className="mt-1 text-xs text-slate-400">📍 {a.location}</p>
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
            <span className="text-xs text-slate-400">Highest Bid</span>
            <span className="font-bold text-emerald-400">${a.highest.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
            <span className="text-xs text-slate-400">Base Price</span>
            <span className="font-semibold text-slate-200">${a.basePrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1 text-slate-400">
            <span>⏱️</span>
            <span>{a.endIn}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>🔨</span>
            <span>{a.totalBids} bids</span>
          </div>
        </div>

        <Link
          to="/login"
          className="block w-full rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 px-4 py-2.5 text-center font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:shadow-xl hover:shadow-cyan-500/50"
        >
          Bid Now
        </Link>
      </div>
    </div>
  );
};

const mockAuctions: Auction[] = [
  {
    id: 1,
    title: "GIA Certified Round Diamond (1.2ct)",
    basePrice: 1200,
    highest: 1500,
    location: "Surat, India",
    endIn: "4h 20m",
    totalBids: 19,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Princess Cut Diamond (0.8ct)",
    basePrice: 800,
    highest: 950,
    location: "Mumbai, India",
    endIn: "9h 45m",
    totalBids: 11,
    image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Emerald Cut Diamond (2.0ct)",
    basePrice: 3000,
    highest: 3500,
    location: "Antwerp, Belgium",
    endIn: "1d 2h",
    totalBids: 27,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950">
      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute top-1/2 -right-32 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 font-bold text-white">💎</div>
            <div>
              <p className="text-lg font-bold text-white">Diamond Bidding</p>
              <p className="text-xs text-slate-400">Premium Auctions</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
              <Link to="/features" className="transition hover:text-white">Features</Link>
              <Link to="/how" className="transition hover:text-white">How it works</Link>
              <Link to="/contact" className="transition hover:text-white">Contact</Link>
            </nav>
            <Link to="/login" className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-cyan-500/50">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2">
            <span className="animate-pulse">●</span>
            <span className="text-sm font-medium text-cyan-300">Live auctions happening now</span>
          </div>
          <h1 className="mb-4 text-5xl font-black leading-tight text-white md:text-6xl">
            Bid on Diamonds <br /> <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">Like Never Before</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
            Join our community of diamond enthusiasts. Real-time bidding, verified listings, and transparent pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login" className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:shadow-cyan-500/50">
              Start Bidding Now
            </Link>
            <Link to="/how" className="rounded-lg border border-white/20 bg-white/5 px-8 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10">
              Learn More
            </Link>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="mb-20 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
            <p className="text-3xl font-bold text-cyan-400">5,234</p>
            <p className="mt-1 text-sm text-slate-400">Active Auctions</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
            <p className="text-3xl font-bold text-blue-400">$42.5M</p>
            <p className="mt-1 text-sm text-slate-400">Total Volume</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
            <p className="text-3xl font-bold text-violet-400">128K</p>
            <p className="mt-1 text-sm text-slate-400">Active Members</p>
          </div>
        </section>

        {/* Featured Auctions */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Featured Auctions</h2>
            <p className="mt-2 text-slate-400">Browse our most popular diamond listings</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockAuctions.map((a) => (
              <FeaturedAuctionCard key={a.id} a={a} />
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">How It Works</h2>
            <p className="mt-2 text-slate-400">Four simple steps to start bidding</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", title: "Create Account", desc: "Sign up and verify your identity in minutes" },
              { num: "02", title: "Browse Auctions", desc: "Explore verified diamond listings with images" },
              { num: "03", title: "Place Your Bid", desc: "Bid securely with our encrypted platform" },
              { num: "04", title: "Win & Close", desc: "Complete transaction and receive your diamond" },
            ].map((step) => (
              <div key={step.num} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-cyan-400/40 hover:bg-white/10">
                <p className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{step.num}</p>
                <h3 className="mt-3 font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">Why Choose Us</h2>
            <p className="mt-2 text-slate-400">Industry-leading features for diamond trading</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🔒", title: "Secure & Verified", desc: "All diamonds verified by certified experts" },
              { icon: "⚡", title: "Real-Time Bidding", desc: "Live auction updates with instant notifications" },
              { icon: "💎", title: "Premium Collection", desc: "Curated selection of high-quality diamonds" },
              { icon: "🌍", title: "Global Access", desc: "Bid from anywhere in the world securely" },
              { icon: "📊", title: "Transparent Pricing", desc: "Clear pricing with no hidden fees" },
              { icon: "🏆", title: "Expert Support", desc: "24/7 support from diamond specialists" },
            ].map((feature) => (
              <div key={feature.title} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-3xl">{feature.icon}</p>
                <h3 className="mt-3 font-bold text-white">{feature.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-violet-500/10 p-12 text-center backdrop-blur">
          <h2 className="text-3xl font-bold text-white">Ready to Start Bidding?</h2>
          <p className="mt-3 text-slate-300">Join thousands of diamond collectors and traders worldwide</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/login" className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:shadow-cyan-500/50">
              Create Account
            </Link>
            <Link to="/contact" className="rounded-lg border border-white/40 px-8 py-3 font-semibold text-white transition hover:bg-white/10">
              Get Help
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          <p>© 2026 Diamond Bidding System. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
