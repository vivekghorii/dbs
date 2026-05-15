import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
     <Sidebar
  items={[
    { label: "Dashboard", path: "/admin" },
    { label: "Users", path: "/admin/users" },
    { label: "Diamonds", path: "/admin/diamonds" },
    { label: "Bids", path: "/admin/bids" },
    { label: "Results", path: "/admin/results" },
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

export default AdminLayout;
