"use client";
import React, { useEffect, useState } from "react";
import data from "../../utils/data2.json";
import { MdCancel } from "react-icons/md";

export default function Page() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [dropData, setDropData] = useState([]);

  const handleDragStart = (e, item, itemId, role) => {
    const obData = { item, itemId, role };
    const dataString = JSON.stringify(obData);
    e.dataTransfer.setData("element", dataString);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dataToDrop = e.dataTransfer.getData("element");
    const droppedData = JSON.parse(dataToDrop);
    if (!dropData.some((item) => item.id === droppedData.itemId)) {
      const cardName = data.find(
        (item) => item.module_id === selectedCard
      ).module_name;
      setDropData([
        ...dropData,
        {
          id: droppedData.itemId,
          item: droppedData.item,
          role: droppedData.role,
          cardName,
        },
      ]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCardClick = (moduleId) => {
    setSelectedCard(moduleId === selectedCard ? null : moduleId);
  };

  const handleDelete = (id) => {
    const updatedData = dropData.filter((data) => data.id !== id);
    setDropData(updatedData);
  };

  const handleAddAll = () => {
    // Check if all data items already exist in dropData
    const allItemsExist = data.every((dataItem) => {
      return (
        dataItem.module_permission.every((per) =>
          dropData.some((data) => data.id === per.id)
        ) &&
        dataItem.module_menu.every((menu) =>
          dropData.some((data) => data.id === menu.id)
        )
      );
    });

    if (!allItemsExist) {
      const allRoleItems = [];
      data.forEach((dataItem) => {
        dataItem.module_permission.forEach((per) => {
          if (!dropData.some((data) => data.id === per.id)) {
            allRoleItems.push({
              id: per.id,
              item: per.name,
              role: "permission",
              cardName: dataItem.module_name,
            });
          }
        });
        dataItem.module_menu.forEach((menu) => {
          if (!dropData.some((data) => data.id === menu.id)) {
            allRoleItems.push({
              id: menu.id,
              item: menu.name,
              role: "menu",
              cardName: dataItem.module_name,
            });
          }
        });
      });

      setDropData([...dropData, ...allRoleItems]);
    }
  };

  useEffect(() => {
    console.log(dropData);
  }, [dropData]);

  return (
    <div className="w-full h-screen bg-slate-100 flex justify-center items-center">
      <section className="w-3/4 h-3/4 bg-white rounded-xl shadow-lg flex">
        <div className="w-2/3 h-full relative p-10">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="w-full h-full"
          >
            <div className="w-full  flex flex-wrap gap-3 justify-start items-start">
              {dropData.map((data, index) => (
                <p
                  key={index}
                  className={`rounded-full w-fit h-fit px-5 border-2 border-blue-500 select-none flex items-center gap-2 ${
                    data.role === "permission" ? "bg-blue-200" : "bg-cyan-200"
                  }`}
                >
                  <span className="text-blue-500 font-bold">
                    {" "}
                    {data.cardName}
                  </span>{" "}
                  {data.item}
                  <MdCancel
                    onClick={() => handleDelete(data.id)}
                    className="text-red-600 text-lg cursor-pointer"
                  />
                </p>
              ))}
            </div>
          </div>

          {dropData.length === 0 && (
            <h1 className="text-xl text-gray-300 select-none font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Drag n Drop Your Item
            </h1>
          )}

          {dropData.length !== 0 && (
            <button
              onClick={() => setDropData([])}
              className="bg bg-red-600 p-1 px-2 text-white font-bold rounded-md absolute bottom-5 left-32"
            >
              Remove All
            </button>
          )}

          <button
            onClick={handleAddAll}
            className="bg bg-green-600 p-1 px-2 text-white font-bold rounded-md absolute bottom-5 left-10"
          >
            Add All
          </button>
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
                  className="bg-rose-400 font-bold text-lg text-white py-2 cursor-pointer select-none"
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
                          draggable={
                            dropData.some((data) => data.id === per.id)
                              ? "false"
                              : "true"
                          }
                          onDragStart={(e) =>
                            handleDragStart(e, per.name, per.id, "permission")
                          }
                          className={`rounded-full border-2 border-blue-500 select-none bg-blue-200  ${
                            dropData.some((data) => data.id === per.id)
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          {per.name}
                        </p>
                      ))}
                    </div>
                    <div className="w-1/2 flex flex-col gap-1">
                      {dataItem.module_menu.map((menu) => (
                        <p
                          key={menu.id}
                          draggable={
                            dropData.some((data) => data.id === menu.id)
                              ? "false"
                              : "true"
                          }
                          onDragStart={(e) =>
                            handleDragStart(e, menu.name, menu.id, "menu")
                          }
                          className={`rounded-full border-2 border-blue-500 select-none bg-cyan-200  ${
                            dropData.some((data) => data.id === menu.id)
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
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
