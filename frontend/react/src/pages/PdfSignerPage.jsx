import React, { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { DndContext } from "@dnd-kit/core";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import DraggableSignature from "../components/DraggableSignature";
import SignaturePanel from "../components/SignaturePanel";
import Layout from "../components/Layout";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token;
const userId = user?.user?.id;


const PdfSignerPage = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [signatures, setSignatures] = useState([]);
  const [uploadedDocumentId, setUploadedDocumentId] = useState(null);



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file);
      setFileUrl(fileURL);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    setSignatures((prev) =>
      prev.map((sig) =>
        sig.id === active.id
          ? { ...sig, x: sig.x + delta.x, y: sig.y + delta.y }
          : sig
      )
    );
  };

  const handleDelete = (id) => {
    setSignatures((prev) => prev.filter((sig) => sig.id !== id));
  };

  const uploadSignedPDF = async (formData) => {
    try {
      const response = await fetch(`${baseUrl}/api/signature/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
           console.log("Upload success:", data);
 setUploadedDocumentId(result.documentId || result.file );
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

 const handleDownloadSignedPDF = async () => {
  if (!fileUrl || signatures.length === 0) {
    alert("No PDF or no signatures to export.");
    return;
  }


  try {
    const existingPdfBytes = await fetch(fileUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Measure scale between rendered PDF and actual PDF size
    const rendered = document.querySelector(".rpv-core__page-layer");
    const renderedWidth = rendered?.offsetWidth || 1;
    const renderedHeight = rendered?.offsetHeight || 1;

    const pdfWidth = firstPage.getWidth();
    const pdfHeight = firstPage.getHeight();

    const widthScale = pdfWidth / renderedWidth;
    const heightScale = pdfHeight / renderedHeight;

   

    // Font mapping
    const fontMap = {
      "Cursive": StandardFonts.TimesRomanItalic,
      "Serif": StandardFonts.TimesRoman,
      "Sans-serif": StandardFonts.Helvetica,
      "Monospace": StandardFonts.Courier,
      "Fantasy": StandardFonts.Helvetica
    };

    // Draw all signatures
    for (let sig of signatures) {
      const { text, x, y, color, font: fontFamily } = sig;

      const r = parseInt(color.substring(1, 3), 16) / 255;
      const g = parseInt(color.substring(3, 5), 16) / 255;
      const b = parseInt(color.substring(5, 7), 16) / 255;

      const mappedFont = fontMap[fontFamily] || StandardFonts.Helvetica;
      const embeddedFont = await pdfDoc.embedFont(mappedFont);

      firstPage.drawText(text, {
        x: x * widthScale,
        y: pdfHeight - (y * heightScale),
        size: 18,
        font: embeddedFont,
        color: rgb(r, g, b),
      });
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const formData = new FormData();
formData.append("file", new File([blob], "signed-document.pdf", { type: "application/pdf" }));
await uploadSignedPDF(formData);

    const link = document.createElement("a");
    link.href = url;
    link.download = "signed-document.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Download failed.");
  }
  if (uploadedDocumentId) {
  await fetch(`${baseUrl}/api/audit`, {
  method: "POST",
  headers: {
     Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId:user.id ,       
    documentId: uploadedDocumentId,   
    action: "signed",            
    ip: ""                      
  }),
});}
};



  return (
  <Layout>
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      
      
      {/* Left Side: PDF Viewer */}
      <div style={{ flex: 3, background: "#f5f5f5", overflow: "auto", position: "relative" }}>
       

          {!fileUrl ? (
  <div style={{
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>
    <input
      type="file"
      accept="application/pdf"
      onChange={handleFileChange}
      style={{
        padding: "12px 24px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    />
  </div>
) : (
          <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
             <div id="pdf-container" style={{ position: "relative" }}>
  <Viewer fileUrl={fileUrl} />
</div>
            </Worker>

            <DndContext onDragEnd={handleDragEnd}>
              {signatures.map((sig) => (
                <DraggableSignature
                  key={sig.id}
                  id={sig.id}
                  x={sig.x}
                  y={sig.y}
                  text={sig.text}
                  font={sig.font}
                  color={sig.color}
                  onDelete={() => handleDelete(sig.id)}
                />
              ))}
            </DndContext>
          </>
        )}
       

      </div>
      

      {/* Right Side: Signature Controls */}
      <div style={{
        flex: 1,
        background: "#ffffff",
        padding: "20px",
        borderLeft: "1px solid #ddd",
        height: "100vh",
        overflowY: "auto"
      }}>
        <SignaturePanel onCreate={(sig) => setSignatures((prev) => [...prev, sig])} />
     
      {fileUrl && (
        
  <div style={{ padding: "10px" }}>
    <button
      onClick={handleDownloadSignedPDF}
      style={{
        padding: "10px 20px",
        backgroundColor: "#10b981",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      Download Signed PDF
    </button>
  </div>
  
)} 

</div>
</div>

     
       </Layout> 
  );
};
export default PdfSignerPage;
