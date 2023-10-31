import React, { useState } from "react";
import "./signup.css";
import { auth } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsj, setErrorMsj] = useState("");
  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log(user);
    } catch (error) {
      const errorMessage = error.message;
      setErrorMsj(errorMessage);
    }
  };
  return (
    <div className="login-wrapper">
      <h1>Register</h1>
      <form>
        <div className="formInputs">
          <label>Email</label>
          <input
            className="inputEmail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="formInputs">
          <label>Password</label>
          <input onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleCreateUser} className="login-btn">
          Login
        </button>
        <span>{errorMsj}</span>
      </form>
    </div>
  );
};

export default SignUp;
