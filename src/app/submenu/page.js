"use client";
import React, { useState } from "react";

function App() {
  const [menuItems, setMenuItems] = useState([
    { id: 1, label: "Item 1", subItems: [] },
    { id: 2, label: "Item 2", subItems: [] },
    { id: 3, label: "Item 3", subItems: [] },
    { id: 4, label: "Item 4", subItems: [] },
  ]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDrop = (e, parentId) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    const updatedItems = [...menuItems];
    const movedItem = updatedItems.find(
      (item) => item.id === parseInt(itemId, 10)
    );
    if (movedItem) {
      if (parentId === null) {
        movedItem.subItems = [];
        setMenuItems([...updatedItems, { ...movedItem }]);
      } else {
        const parentItem = updatedItems.find((item) => item.id === parentId);
        if (parentItem) {
          parentItem.subItems = [...parentItem.subItems, { ...movedItem }];
          setMenuItems([...updatedItems, { ...parentItem }]);
        }
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            onDrop={(e) => handleDrop(e, item.id)}
            onDragOver={handleDragOver}
          >
            {item.label}
            {item.subItems.length > 0 && (
              <ul>
                {item.subItems.map((subItem) => (
                  <li key={subItem.id}>{subItem.label}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div>
        Available Items:
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  return <App />;
}
