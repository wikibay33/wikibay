// /app/search/page.jsx

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SoftwareSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search-software?query=${e.target.value}`);
      if (!response.ok) throw new Error("Error fetching search results");

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Search Software</h1>
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search software..."
          value={query}
          onChange={handleSearch}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      {!loading && !error && results.length === 0 && query.length > 1 && (
        <p className="text-center text-gray-500 mt-4">No software found for &quot;{query}&quot;.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {results.map((software) => (
          <div key={software._id} className="p-4 border rounded-lg text-center shadow-md">
            <div className="flex justify-center items-center mb-4">
              <Image
                src={software.logo || "/placeholder.png"} // Fallback to placeholder if no logo
                alt={software.name}
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">{software.name}</h3>
            <p className="text-sm mb-4">{software.description}</p>
            <Link href={`/software/${software._id}`}>
              <a className="inline-block px-4 py-2 mt-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                View Details
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
