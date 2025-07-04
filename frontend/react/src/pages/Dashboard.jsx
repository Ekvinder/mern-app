import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
const features = [
  {
    title: "PDF to Excel",
    desc: "Pull data straight from PDFs into Excel spreadsheets in a few short seconds.",
    icon: "📊",
  },
  {
    title: "Word to PDF",
    desc: "Make DOC and DOCX files easy to read by converting them to PDF.",
    icon: "📄",
  },
  
  {
    title: "Sign to PDF",
    desc: "sign your self in your PDF",
    icon: "✏️",
    link: "/pdf-signer",
  },
  {
    title: "Excel to PDF",
    desc: "Make EXCEL spreadsheets easy to read by converting them to PDF.",
    icon: "📈",
  },
  {
    title: "Edit PDF",
    desc: "Add text, images, shapes or annotations to a PDF document. Edit font, size, color.",
    icon: "✏️",
  },
];
  return (
    <div style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f9f9f9",
        padding: "40px",
        boxSizing: "border-box",
      }}>
        
      <Header />
      <div className="container-fluid px-5 py-4" style={{ minHeight: "100vh", background: "#f9f9f9" }}>
      <h1 className="mb-4">Welcome,{user?.user?.name || "User"}! </h1>
      <p className="mb-5">Choose a tool to get started:</p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5 g-4">
        {features.map((feature, index) => (
  <div key={index} className="col">
    {feature.link ? (
      <Link to={feature.link} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body">
            <div style={{ fontSize: "2rem" }}>{feature.icon}</div>
            <h5 className="card-title mt-2">{feature.title}</h5>
            <p className="card-text" style={{ fontSize: "0.9rem" }}>{feature.desc}</p>
          </div>
        </div>
      </Link>
    ) : (
      <div className="card h-100 shadow-sm border-0">
        <div className="card-body">
          <div style={{ fontSize: "2rem" }}>{feature.icon}</div>
          <h5 className="card-title mt-2">{feature.title}</h5>
          <p className="card-text" style={{ fontSize: "0.9rem" }}>{feature.desc}</p>
        </div>
      </div>
    )}
  </div>
))}
      </div>
    </div>
        
      <Footer />
    </div>
  );
};

export default Dashboard;