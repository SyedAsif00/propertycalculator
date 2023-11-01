import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleOpen, handleClose }) {
  const navigate = useNavigate();

  const handleAuthLogout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        // Additional actions after successful sign-out, if needed.
        console.log("Sign-out successful");
        navigate("/login");
      })
      .catch((error) => {
        // Handle sign-out errors.
        console.error("Sign-out error:", error.message);
      });
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h3>Doyou want to log out ?</h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <button
              style={{
                padding: 0,
                backgroundColor: "gray",
                width: "80px",
                height: "40px",
                marginRight: "20px",
              }}
              onClick={handleAuthLogout}
            >
              Logout
            </button>
            <button
              style={{
                padding: 0,
                backgroundColor: "gray",
                width: "80px",
                height: "40px",
              }}
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
