import { BrowserRouter, Routes, Route } from "react-router-dom";
import PdfSignerPage from './pages/PdfSignerPage';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuditPage from "./pages/AuditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
         <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/pdf-signer" element={<PdfSignerPage />} />
        <Route path="/audit" element={<AuditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
