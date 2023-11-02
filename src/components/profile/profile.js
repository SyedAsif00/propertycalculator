import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, message } from "antd";
import { auth, db } from "../../firebase/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Header from "../header/index";
import Sidebar from "../sidebar/index";

const UserProfile = () => {
  const user = auth.currentUser;
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      getDoc(userDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          setUserData({ ...docSnapshot.data() });
        } else {
          // Set initial data if not already in Firestore
          setUserData((prevData) => ({ ...prevData, email: user.email || "" }));
        }
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!validatePhoneNumber(userData.phone)) {
      message.error("Invalid phone number format.");
      return;
    }
    if (!validateUsername(userData.username)) {
      message.error("Username must be less than or equal to 50 characters.");
      return;
    }
    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, userData);
      message.success("User data updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
      message.error("Failed to update user data.");
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateUsername = (username) => {
    return username.length <= 50;
  };

  return (
    <Card
      title="User Profile"
      style={{
        width: 500,
        margin: "auto",
        marginTop: 50,
        padding: 20,
        border: "1px solid #6439FF",
      }}
    >
      <Card.Grid style={{ width: "100%", border: "none" }}>
        <span>Email: {userData.email}</span>
      </Card.Grid>
      <Card.Grid style={{ width: "100%", border: "none" }}>
        <span>Username:</span>
        <Input
          value={userData.username}
          onChange={(e) =>
            handleInputChange("username", e.target.value.slice(0, 50))
          }
        />
      </Card.Grid>
      <Card.Grid style={{ width: "100%", border: "none" }}>
        <span>Phone:</span>
        <Input
          value={userData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />
      </Card.Grid>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          border: "none",
          marginTop: "20px",
        }}
      >
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ backgroundColor: "#6439FF", borderColor: "#6439FF" }}
        >
          Save
        </Button>
      </div>
    </Card>
  );
};

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
        <UserProfile />
      </div>
    </div>
  );
};

export default Dashboard;
