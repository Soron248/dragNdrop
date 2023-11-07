"use client";
import React, { useState } from "react";

function App() {
  const [selectedElements, setSelectedElements] = useState([]);
  const elements = ["Reading", "Writing", "Listening", "Speaking"];

  const handleDragStart = (e, element) => {
    e.dataTransfer.setData("element", element);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const element = e.dataTransfer.getData("element");
    if (!selectedElements.includes(element)) {
      setSelectedElements([...selectedElements, element]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{ border: "1px solid #ccc", padding: "10px", flex: 1 }}
        >
          Left Child
          {selectedElements.length > 0 && (
            <div>Your selected elements: {selectedElements.join(", ")}</div>
          )}
        </div>
        <div style={{ border: "1px solid #ccc", padding: "10px", flex: 1 }}>
          Right Child
          {elements.map((element) => (
            <div
              key={element}
              draggable={selectedElements.includes(element) ? "false" : "true"}
              onDragStart={(e) => handleDragStart(e, element)}
            >
              {element}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return <App />;
}
