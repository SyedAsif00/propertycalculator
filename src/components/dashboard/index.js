import React from "react";
import "./dashboard.css";
import Sidebar from "../sidebar/index";
import Header from "../header/index";
import { Button } from "antd";
import { businessButton } from "../../styles/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate("/form");
  };
  return (
    <div className="mainDashboard">
      <Sidebar />
      <div className="homeContainer">
        <Header />
        <Button style={businessButton} onClick={handleNav}>
          + Create New Form
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
