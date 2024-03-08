import React, { useEffect, useRef, useState } from "react";
import { useGetpostsQuery } from "../redux/api";

const ProductPage = () => {
  const { data: productsData, error: productsError, isLoading: productsLoading } = useGetpostsQuery();
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

  if (productsLoading) {
    return <div>Loading...</div>;
  }

  if (productsError) {
    return <div>Error loading product data</div>;
  }

  if (!Array.isArray(productsData?.data) || productsData.data.length === 0) {
    return <div>No product data available</div>;
  }

  return (
    <div className="relative">
      <div className="flex p-4 overflow-x-scroll" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} ref={containerRef}>
        {productsData.data.map((product) => (
          <div key={product._id} className="bg-purple-200 p-2 rounded-lg shadow-lg mr-2" style={{ minWidth: "200px" }}>
            <strong>{product.name}</strong>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Discount Price: ${product.discountPrice}</p>
            <img src={`https://pp-6s4b.onrender.com/${product.photo.replace(/\\/g, "/")}`} alt={product.name} style={{ maxWidth: '200px' }} />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button className="p-1 bg-purple-600 text-white m-1 w-20 cursor-pointer" onClick={() => handleScroll("prev")}>
          Prev
        </button>
        <button className="p-1 bg-purple-600 text-white m-1 w-20 cursor-pointer" onClick={() => handleScroll("next")}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
