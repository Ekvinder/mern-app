import React, { useEffect, useState } from "react";
const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token;
const userId = user?.user?.id;
const AuditTrailPanel = ({ documentId, token }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/audit/${documentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch audit logs", error);
      }
    };

    if (documentId) fetchLogs();
  }, [documentId, token]);

  return (
    <div>
      <h3>Audit Trail</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc" }}>Action</th>
            <th style={{ borderBottom: "1px solid #ccc" }}>User</th>
            <th style={{ borderBottom: "1px solid #ccc" }}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.action}</td>
              <td>{log.userId || "Guest"}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditTrailPanel;
