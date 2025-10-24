import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Status1 from "./components/Status1";
import SubmitComplaint from "./components/SubmitComplaint";
import Featured from "./components/Featured";
import UserTabs from "./components/UserTabs";

const DashHome = ({ user }) => (
  <div>
    <Featured user={user} />
    <UserTabs user={user} />
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    } else {
      // 🚨 Redirect to login if not logged in
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <Navbar user={user} /> {/* Pass user details */}
      <div className="dashboard-content">
        <Routes>
          <Route index element={<DashHome user={user} />} />
          <Route path="complaint" element={<SubmitComplaint user={user} />} />
          <Route path="status1" element={<Status1 user={user} />} />
        </Routes>
      </div>
    </div>
  );
};


export default Dashboard;
