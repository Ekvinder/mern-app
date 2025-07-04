// components/SignaturePanel.jsx
import React, { useState } from "react";

const fonts = ["Cursive", "Serif", "Sans-serif", "Monospace", "Fantasy"];
const colors = ["#000000", "#1e40af", "#dc2626", "#16a34a", "#d97706"]; // Black, Blue, Red, Green, Orange

const SignaturePanel = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleCreate = () => {
    if (name.trim() === "") return;

    const signature = {
      id: Date.now(),
      text: name,
      font: selectedFont,
      color: selectedColor,
      x: 50,
      y: 50,
    };

    onCreate(signature);
    setName(""); // Clear name field
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2 style={{ fontSize: "20px", color: "black", marginBottom: "16px" }}>
        Create Signature
      </h2>
      {/* Signature Input */}
  <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px",color: "#111" }}>
    Your Signature:
  </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
        style={{
          padding: "10px",
          width: "100%",
          fontSize: "16px",
          marginBottom: "16px",
        }}
      />

      {/* Preview Different Fonts */}
      <div>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px",color: "#111" }}>
          Choose Style:
        </label>
        {fonts.map((font) => (
          <div
            key={font}
            onClick={() => setSelectedFont(font)}
            style={{
              fontFamily: font,
              fontSize: "20px",
              color:selectedColor,
              padding: "8px",
              marginBottom: "6px",
              cursor: "pointer",
              border: selectedFont === font ? "2px solid #007bff" : "1px solid #ccc",
              backgroundColor: selectedFont === font ? "#e0f2fe" : "#f9f9f9",
              borderRadius: "5px",
            }}
          >
            {name || "Your Signature"}
          </div>
        ))}
      </div>

      {/* Color Picker */}
      <div style={{ marginTop: "16px" }}>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px",color: "#111" }}>
          Pick Color:
        </label>
        <div style={{ display: "flex", gap: "10px" }}>
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: color,
                border: selectedColor === color ? "3px solid #000" : "1px solid #aaa",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* Add Signature Button */}
      <button
        onClick={handleCreate}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          width: "100%",
          backgroundColor: "#007bff",
          color: "#fff",
          fontSize: "16px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Add Signature
      </button>
    </div>
  );
};

export default SignaturePanel;

