import React, { useState } from "react";
import { useGetpostsQuery } from "../redux/api";
import { Link } from "react-router-dom";

const MainHomeBoxes = ({ category }) => {
  const { data, isLoading, isError } = useGetpostsQuery();
  const [scrollPosition, setScrollPosition] = useState(0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  if (!Array.isArray(data?.data) || data.data.length === 0) {
    return <div>No products available</div>;
  }

  // Filter products based on the category
  const filteredProducts = data.data.filter((product) => product.category === category);

  if (filteredProducts.length === 0) {
    return <div>No products available for the selected category</div>;
  }

  const scrollLeft = () => {
    setScrollPosition((prevPosition) => Math.max(prevPosition - 400, 0));
  };

  const scrollRight = () => {
    setScrollPosition((prevPosition) => prevPosition + 400);
  };

  return (
    <div className="productContainer relative">
      <h2 className="category-title">{category}</h2>
      <div className="flex overflow-x-scroll scrollbar-hide" style={{ position: "relative" }}>
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-gray-200 p-2 rounded-lg shadow-lg mr-2 hover:bg-gray-300 transition duration-300">
            {/* Use Link to navigate to the ProductPage with the product ID */}
            <Link to={`/single-product/${product._id}`} className="linkbox">
              <div className="productbox">
                <img
                  className="productImage w-full h-32 object-cover rounded-md mb-2"
                  src={`http://localhost:8001/${product.photo.replace(/\\/g, "/")}`}
                  alt={product.name}
                />
                <h2 className="productName text-center font-semibold">{product.name}</h2>
              </div>
            </Link>
          </div>
        ))}
        <button className="p-1 bg-purple-600 text-white m-1 w-20" onClick={scrollLeft}>
          Prev
        </button>
        <button className="p-1 bg-purple-600 text-white m-1 w-20" onClick={scrollRight}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MainHomeBoxes;
