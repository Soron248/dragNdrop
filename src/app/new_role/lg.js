"use client";
import React, { useState } from "react";
import data from "../../utils/data2.json";

export default function Page() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [dropData, setDropData] = useState([]);

  const handleDragStart = (e, element) => {
    e.dataTransfer.setData("element", element);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const element = e.dataTransfer.getData("element");
    if (!dropData.some((item) => item.element === element)) {
      const cardName = data.find(
        (item) => item.module_id === selectedCard
      ).module_name;
      setDropData([...dropData, { element, cardName }]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCardClick = (moduleId) => {
    setSelectedCard(moduleId === selectedCard ? null : moduleId);
  };

  return (
    <div className="w-full h-screen bg-slate-100 flex justify-center items-center">
      <section className="w-3/4 h-3/4 bg-white rounded-xl shadow-lg flex">
        <div className="w-2/3 h-full relative p-10">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="w-full h-full flex flex-wrap gap-3 justify-start items-start"
          >
            {dropData.map((data, index) => (
              <p
                key={index}
                className="rounded-full w-fit h-fit px-5 border-2 border-blue-500 select-none"
              >
                <span className="text-blue-500"> {data.cardName}</span>{" "}
                {data.element}
              </p>
            ))}
          </div>

          {dropData.length === 0 && (
            <h1 className="text-xl text-gray-300 select-none font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Drag n Drop Your Item
            </h1>
          )}
        </div>

        <div className="w-1/3 h-full border-l-4 border-dotted flex flex-col gap-5 items-center p-5">
          {data.map((dataItem) => {
            const isCardSelected = dataItem.module_id === selectedCard;
            return (
              <div
                key={dataItem.module_id}
                className={`w-full text-center rounded-md overflow-hidden border-2 border-rose-400 card-clickable ${
                  isCardSelected ? "selected" : ""
                }`}
              >
                <h2
                  className="bg-rose-400 font-bold text-lg text-white py-2 cursor-pointer"
                  onClick={() => handleCardClick(dataItem.module_id)}
                >
                  {dataItem.module_name}
                </h2>
                {isCardSelected && (
                  <div className="w-full text-sm p-2 flex gap-1">
                    <div className="w-1/2 flex flex-col gap-1">
                      {dataItem.module_permission.map((per) => (
                        <p
                          key={per.id}
                          draggable="true"
                          onDragStart={(e) => handleDragStart(e, per.name)}
                          className="rounded-full border-2 border-blue-500 cursor-pointer"
                        >
                          {per.name}
                        </p>
                      ))}
                    </div>
                    <div className="w-1/2 flex flex-col gap-1">
                      {dataItem.module_menu.map((menu) => (
                        <p
                          key={menu.id}
                          draggable="true"
                          onDragStart={(e) => handleDragStart(e, menu.name)}
                          className="rounded-full border-2 border-blue-500 cursor-pointer"
                        >
                          {menu.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
