
// pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/api/auth/register`, form);
      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
        <Header/>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <input type="text" className="form-control mb-2" placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" className="form-control mb-2" placeholder="Email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="form-control mb-2" placeholder="Password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      <Footer/>
    </div>
  );
};

export default Register;