import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../index.css";
import googleLogo from "../assets/google.png";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/add");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="containerL">
      <button className="google-btn" onClick={handleLogin}>
        <img src={googleLogo} alt="Google Logo" className="google-icon" />
        <span> Login</span>
      </button>
    </div>
  );
};

export default Login;
