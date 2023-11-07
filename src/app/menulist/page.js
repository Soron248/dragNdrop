"use client";
import React, { useState } from "react";

function App() {
  const [listItems, setListItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
  ]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("index");

    const updatedList = [...listItems];
    const [movedItem] = updatedList.splice(sourceIndex, 1);
    updatedList.splice(targetIndex, 0, movedItem);

    setListItems(updatedList);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ul>
        {listItems.map((item, index) => (
          <li
            className="bg-lime-300 w-96 h-16 mb-5 flex items-center pl-5 font-bold cursor-pointer"
            key={index}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return <App />;
}
