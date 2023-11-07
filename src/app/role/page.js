"use client";
import React, { useState } from "react";
import data from "../../utils/data.json";

export default function Page() {
  const [cardDropValues, setCardDropValues] = useState({});

  const handleDragStart = (e, element, cardId) => {
    // Check if the element is not already in the state for the specific cardId
    if (!(cardDropValues[cardId] || []).includes(element)) {
      e.dataTransfer.setData("element", element);
    } else {
      e.preventDefault(); // Prevent dragging the element again
    }
  };

  const handleDrop = (e, cardId) => {
    e.preventDefault();
    const element = e.dataTransfer.getData("element");
    setCardDropValues({
      ...cardDropValues,
      [cardId]: [...(cardDropValues[cardId] || []), element],
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full p-10">
      {data &&
        data.map((card) => {
          const cardId = card.id;

          return (
            <section
              key={cardId}
              className="w-full min-h-fit rounded-lg border-dotted border-4 border-red-100 flex mb-5"
            >
              <div className="w-4/5 relative bg-slate-100 rounded-lg">
                <p className="text-3xl font-bold text-gray-400 w-10 h-10 flex justify-center items-center">
                  {cardId}
                </p>
                <div
                  onDrop={(e) => handleDrop(e, cardId)}
                  onDragOver={handleDragOver}
                  className="flex w-full h-full flex-wrap"
                >
                  {(cardDropValues[cardId] || []).map((data, index) => {
                    return (
                      <p
                        key={index}
                        className="bg-pink-600 w-fit h-fit text-white rounded-md p-2 m-3"
                      >
                        {data}
                      </p>
                    );
                  })}
                </div>
                <h1
                  className={`text-4xl text-gray-300 select-none font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                    !(cardDropValues[cardId] && cardDropValues[cardId].length)
                      ? "block"
                      : "hidden"
                  }`}
                >
                  Drag & Drop {card.moduleName} Role
                </h1>
              </div>

              <div className="w-1/5 h-full p-3">
                <h2 className="w-full py-2 rounded-lg text-center text-xl font-bold bg-cyan-700 text-white mb-5">
                  {card.moduleName}
                </h2>
                <div className="w-full flex gap-2">
                  <div className="w-1/2 text-center flex flex-col gap-2">
                    {card.action.map((action, index) => {
                      return (
                        <p
                          key={index}
                          draggable="true"
                          onDragStart={(e) =>
                            handleDragStart(e, action, cardId)
                          }
                          className="border-2 border-blue-600 rounded-md py-1 cursor-pointer"
                        >
                          {action}
                        </p>
                      );
                    })}
                  </div>
                  <div className="w-1/2 text-center flex flex-col gap-2">
                    {card.menuName.map((menu, index) => {
                      return (
                        <p
                          key={index}
                          draggable="true"
                          onDragStart={(e) => handleDragStart(e, menu, cardId)}
                          className="border-2 border-green-600 rounded-md py-1 cursor-pointer"
                        >
                          {menu}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
    </div>
  );
}
