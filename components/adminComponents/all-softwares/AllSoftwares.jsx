"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AllSoftwares() {
  const [softwares, setSoftwares] = useState([]);
  const router = useRouter();

  // Fetch all software items
  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const response = await fetch("/api/softwares/get-softwares");
        const data = await response.json();
        setSoftwares(data);
      } catch (error) {
        console.error("Failed to fetch softwares:", error);
      }
    };
    fetchSoftwares();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/softwares/delete-software/${id}`, { method: "DELETE" });
      setSoftwares(softwares.filter((software) => software._id !== id));
    } catch (error) {
      console.error("Failed to delete software:", error);
    }
  };

  // Handle update navigation
  const handleUpdate = (id) => {
    router.push(`/update/${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Softwares</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {softwares.map((software) => (
          <div key={software._id} className="p-4 border rounded-lg flex flex-col justify-between items-center">
            {software.logo &&
            <Image src={software.logo} width={100} height={100} alt={software.name}/>}
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
  );
}
