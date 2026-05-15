import UserLayout from "../../layouts/UserLayout";

const UserDashboard = () => {
  return (
    <UserLayout>
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <p className="mt-2 text-gray-600">
        View active bids and track your results.
      </p>
    </UserLayout>
  );
};

export default UserDashboard;
