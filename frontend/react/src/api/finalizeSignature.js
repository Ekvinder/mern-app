import axios from "axios";

export const finalizeSignature = async (documentId, userId) => {
  try {
    const response = await axios.post("http://localhost:3000/api/signature/finalize", {
      documentId,
      userId,
    });

    alert("PDF signed successfully!");
    window.open(`http://localhost:3000/${response.data.file}`, "_blank");
  } catch (err) {
    console.error("❌ Error finalizing signature:", err);
    alert("Failed to sign PDF.");
  }
};
