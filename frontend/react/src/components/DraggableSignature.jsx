
import React from "react";
import { useDraggable } from "@dnd-kit/core";

const DraggableSignature = ({ id, x, y, text,font, color,onDelete }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    position: "absolute",
    top: y,
    left: x,
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : "none",
    padding: "8px 12px",
    background: "#fff",
    border: "1px solid #aaa",
    borderRadius: "4px",
    cursor: "move",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
     fontFamily: font,
    color: color,
    zIndex:1000,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {text}
      <button onClick={onDelete} style={{ marginLeft: "10px", color: "red" }}>
        ❌
      </button>
    </div>
  );
};

export default DraggableSignature;
