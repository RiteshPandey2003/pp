import React, { useEffect, useRef, useState } from "react";
import { useGetpostsQuery } from "../redux/api";

const Boxes1 = () => {
  const { data, isLoading, isError } = useGetpostsQuery();
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const handleScroll = (direction) => {
    const scrollIncrement = 200; 
    if (containerRef.current) {
      setScrollPosition((prevPosition) => {
        if (direction === "prev") {
          return Math.max(prevPosition - scrollIncrement, 0);
        } else if (direction === "next") {
          return prevPosition + scrollIncrement;
        }
        return prevPosition;
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading category data</div>;
  }

  if (!Array.isArray(data?.data) || data.data.length === 0) {
    return <div>No category data available</div>;
  }
  return (
    <div className="relative">
      <div className="flex p-4 overflow-x-scroll" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} ref={containerRef}>
        {data.data.map((category) => (
          <div key={category._id} className="bg-purple-200 p-2 rounded-lg shadow-lg mr-2" style={{ minWidth: "200px" }}>
            <p className="font-bold">{category.originalPrice}</p>
            <p>{category.stock}</p>
          </div>
        ))}
      </div>
      <button className="p-1 bg-purple-600 text-white m-1 w-20" onClick={() => handleScroll("prev")}>
        Prev
      </button>
      <button className="p-1 bg-purple-600 text-white m-1 w-20" onClick={() => handleScroll("next")}>
        Next
      </button>
    </div>
  );
};

export default Boxes1;
