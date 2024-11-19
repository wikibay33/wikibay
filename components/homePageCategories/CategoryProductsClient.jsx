"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function HomePageCategories({ topProductsData }) {
  // Define available categories
  const categories = Object.keys(topProductsData);

  // Set initial category to the first one
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  
  // Filter products based on the selected category
  const products = topProductsData[selectedCategory] || [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Popular Categories</h2>
      </div>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-2 py-2 rounded-full bg-gray-100 ${
                selectedCategory === category ? "bg-gray-300" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {products.length === 0 ? (
        <div className="h-[361px] text-center text-gray-500">
          New softwares comming soon!
        </div>
      ) : (
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">
            {selectedCategory} Softwares
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product._id} className="p-4 border rounded-lg flex flex-col justify-between items-center">
                <div className="flex justify-center items-center">
                  <Image
                    src={product.logo}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="mb-4 h-36"
                  />
                </div>
                <h4 className="text-xl font-bold mb-2">{product.name}</h4>
                <p className="text-sm mb-2">
                  Rating: { ((product.priceRating + product.easeOfUseRating + product.featuresRating + product.supportRating) / 4).toFixed(1)}
                </p>
                <p className="text-sm mb-4">{product.description}</p>
                <div className="w-full flex justify-between items-center">
                  <Link href={`/software/${product._id}`}>
                    <button
                      className="p-2 inline-flex rounded-xl items-center justify-center border border-slate-800 bg-[linear-gradient(110deg,#000000,45%,black,55%,#000000)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    >
                      Read More
                    </button>
                  </Link>
                  <Link href={product?.affiliateUrl?.startsWith('http') ? product.affiliateUrl : `https://${product.affiliateUrl}`} target="_blank" rel="noopener noreferrer">
                    <button
                      type="submit"
                      className="p-2 inline-flex rounded-xl items-center justify-center border border-slate-800 bg-gradient-to-r from-teal-800 via-teal-600 to-teal-500 px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    >
                      Visit Site
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center py-4">
            <Link href={`/category/${selectedCategory}`} className="text-blue-500">
              show all {selectedCategory} Softwares
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
