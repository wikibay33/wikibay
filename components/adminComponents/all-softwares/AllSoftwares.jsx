"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AllSoftwares() {
  const [softwares, setSoftwares] = useState(null); // Software data
  const [categories, setCategories] = useState([]); // Categories data
  const router = useRouter();

  // Fetch categories and softwares
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [softwaresResponse, categoriesResponse] = await Promise.all([
          fetch("/api/softwares/get-softwares", { cache: "no-store" }),
          fetch("/api/softwares/get-categories", { cache: "no-store" }),
        ]);

        const [softwaresData, categoriesData] = await Promise.all([
          softwaresResponse.json(),
          categoriesResponse.json(),
        ]);

        setSoftwares(softwaresData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/softwares/delete-software/${id}`, { method: "DELETE" });
      setSoftwares((prev) => prev.filter((software) => software._id !== id));
    } catch (error) {
      console.error("Failed to delete software:", error);
    }
  };

  // Handle update navigation
  const handleUpdate = (id) => {
    router.push(`/update/${id}`);
  };

  // Scroll to a category
  const scrollToCategory = (category) => {
    const categoryElement = document.getElementById(category);
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (softwares === null || categories.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">All Softwares</h1>
        <p>Loading...</p>
      </div>
    );
  }

  // Group softwares by categories
  const groupedSoftwares = categories.reduce((acc, category) => {
    acc[category] = softwares.filter((software) => software.category === category);
    return acc;
  }, {});

  return (
    <div className="p-8">
      <div className=" md:flex-row justify-between items-center py-4 border-b-2 border-white mb-4">
                <h2 className="text-2xl font-bold text-white">All softwares</h2>
      <div className=" z-10 shadow-md">
        <select
          id="category-select"
          onChange={(e) => scrollToCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      </div>
      {categories.map((category) => (
        <div key={category} id={category} className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-white">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedSoftwares[category]?.map((software) => (
              <div
                key={software._id}
                className="p-4 border rounded-lg flex flex-col justify-between items-center"
              >
                {software.logo ? (
                  <Image
                    src={software.logo || "/default-placeholder.png"}
                    width={100}
                    height={100}
                    alt={software.name || "Software Logo"}
                  />
                ) : (
                  <Image
                    src="/default-placeholder.png"
                    width={100}
                    height={100}
                    alt="Default Placeholder"
                  />
                )}
                <h2 className="text-xl font-semibold">{software.name}</h2>
                <p>{software.description}</p>
                <div className="mt-4 flex justify-between items-center gap-2">
                  <button
                    onClick={() => handleUpdate(software._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(software._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
