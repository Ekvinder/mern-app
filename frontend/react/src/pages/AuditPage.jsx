import React from "react";
import AuditTrailPanel from "../components/AuditTRailPanel";
const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token;
const userId = user?.user?.id;
const AuditPage = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const documentId = uploadedDocumentId; // 

  return (
    <div className="container mt-5">
      <h3>Audit Log Viewer</h3>
      <AuditLogs documentId={documentId} token={token} />
    </div>
  );
};

export default AuditPage;
