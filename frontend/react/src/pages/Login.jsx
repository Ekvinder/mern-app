// pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header"
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/api/auth/login`, form);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
        <Header/>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <input type="email" className="form-control mb-2" placeholder="Email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="form-control mb-2" placeholder="Password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
       <a href="/" type="submit" className="btn btn-success w-100" >Login </a>
        {/* <button type="submit" className="btn btn-success w-100">Login</button> */}
      </form>
      <Footer/>
    </div>
  );
};

export default Login;

