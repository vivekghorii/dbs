import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import UserDashboard from "./pages/user/UserDashboard";
import UsersPage from "./pages/admin/UsersPage";
import DiamondsPage from "./pages/admin/DiamondsPage";
import BidsPage from "./pages/admin/BidsPage";
import ActiveBidsPage from "./pages/user/ActiveBidsPage";
import BidHistoryPage from "./pages/user/BidHistoryPage";
import BidResultsPage from "./pages/user/BidResultsPage";
import MyBidsPage from "./pages/user/MyBidsPage";
import ResultsPage from "./pages/admin/ResultsPage";




const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Default home */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />

          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
  path="/admin/users"
  element={
    <ProtectedRoute role="ADMIN">
      <UsersPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/diamonds"
  element={
    <ProtectedRoute role="ADMIN">
      <DiamondsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/bids"
  element={
    <ProtectedRoute role="ADMIN">
      <BidsPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/user/bids"
  element={
    <ProtectedRoute role="USER">
      <ActiveBidsPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/user/my-bids"
  element={
    <ProtectedRoute role="USER">
      <MyBidsPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/user/bids/:bidId/history"
  element={
    <ProtectedRoute role="USER">
      <BidHistoryPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/user/results"
  element={
    <ProtectedRoute role="USER">
      <BidResultsPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/results"
  element={
    <ProtectedRoute role="ADMIN">
      <ResultsPage />
    </ProtectedRoute>
  }
/>  

          {/* User */}
          <Route
            path="/user"
            element={
              <ProtectedRoute role="USER">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
