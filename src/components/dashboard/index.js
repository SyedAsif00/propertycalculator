import React from "react";
import "./dashboard.css";
import Sidebar from "../sidebar/index";
import Header from "../header/index";
const Dashboard = () => {
  return (
    <div className="mainDashboard">
      <Sidebar />
      <div className="homeContainer">
        <Header />
        homeContainer
      </div>
    </div>
  );
};

export default Dashboard;
