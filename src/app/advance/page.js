"use client";

import { useEffect, useState } from "react";

const page = () => {
  const [dropValue, setDropValue] = useState([]);

  const handleDragStart = (e, element) => {
    e.dataTransfer.setData("element", element);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const element = e.dataTransfer.getData("element");
    setDropValue([...dropValue, element]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log(dropValue);
  }, [dropValue]);

  return (
    <div className="w-full h-screen flex">
      <section
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="bg-cyan-300 w-3/4 p-16 flex gap-5 flex-wrap justify-start"
      >
        {dropValue &&
          dropValue.map((data, index) => {
            return (
              <article
                key={index}
                className="bg-red-600 w-16 h-16 rounded-lg flex justify-center items-center font-bold text-white cursor-pointer"
              >
                {data}
              </article>
            );
          })}
      </section>

      <section className="bg-red-300 w-1/4 p-5 flex gap-5 flex-wrap justify-center">
        <article
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "A1")}
          className="bg-red-600 w-16 h-16 rounded-lg flex justify-center items-center font-bold text-white cursor-pointer"
        >
          A1
        </article>
        <article
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "B1")}
          className="bg-red-600 w-16 h-16 rounded-lg flex justify-center items-center font-bold text-white cursor-pointer"
        >
          B1
        </article>
        <article
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "C1")}
          className="bg-red-600 w-16 h-16 rounded-lg flex justify-center items-center font-bold text-white cursor-pointer"
        >
          C1
        </article>
        <article
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "D1")}
          className="bg-red-600 w-16 h-16 rounded-lg flex justify-center items-center font-bold text-white cursor-pointer"
        >
          D1
        </article>
        <article
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "E1")}
          className="bg-red-600 w-16 h-16 rounded-lg flex justify-center items-center font-bold text-white cursor-pointer"
        >
          E1
        </article>

        <article
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "F1")}
          className="bg-red-600 w-16 h-16 rounded-lg flex justify-center items-center font-bold text-white cursor-pointer"
        >
          F1
        </article>
        <article
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "G1")}
          className="bg-red-600 w-16 h-16 rounded-lg flex justify-center items-center font-bold text-white cursor-pointer"
        >
          G1
        </article>
        <article
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "H1")}
          className="bg-red-600 w-16 h-16 rounded-lg flex justify-center items-center font-bold text-white cursor-pointer"
        >
          H1
        </article>
        <article
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "I1")}
          className="bg-red-600 w-16 h-16 rounded-lg flex justify-center items-center font-bold text-white cursor-pointer"
        >
          I1
        </article>
        <article
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "J1")}
          className="bg-red-600 w-16 h-16 rounded-lg flex justify-center items-center font-bold text-white cursor-pointer"
        >
          J1
        </article>
      </section>
    </div>
  );
};

export default page;
