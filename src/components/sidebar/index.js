import "./sidebar.css";
import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { Button } from "antd";
import AntdModal from "../antdmodal/index";
import Modal from "../antdmodal/index";
import { getAuth, signOut } from "firebase/auth";
import { Create, List } from "@mui/icons-material";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    setOpen(true);
  };
  const auth = getAuth();
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">PropertyCalc</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">INPUT</p>
          <Link to="/form" style={{ textDecoration: "none" }}>
            <li>
              <Create className="icon" />
              <span>Form</span>
            </li>
          </Link>
          {/* 
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li> */}

          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
        <Modal open={open} handleOpen={handleOpen} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default Sidebar;
