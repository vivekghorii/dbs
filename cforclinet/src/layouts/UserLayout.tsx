import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar
  items={[
    { label: "Dashboard", path: "/user" },
    { label: "Active Bids", path: "/user/bids" },
    { label: "My Bids", path: "/user/my-bids" },
    { label: "Results", path: "/user/results" },
  ]}
/>


      <div className="flex-1">
        <Topbar />
        <main className="p-6 bg-gray-100 min-h-[calc(100vh-56px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
