"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="h-full md:h-[50vh] rounded-xl bg-[url('/hero-bg-2.jpg')] bg-cover bg-no-repeat bg-center m-2 text-white grid md:grid-cols-2 justify-center items-center">
      <div className="px-12 py-4">
        <h1 className="text-4xl font-bold mb-4">Empower Your Business with Tailored Solutions</h1>
        <p className="text-xl">Choose confidently, succeed decisively.</p>
      </div>
      <div className="p-12">
        <div className="gap-1 flex justify-center items-center rounded-xl bg-white text-black">
          <Search className="px-1 m-1 cursor-pointer" onClick={handleSearch} />
          <input
            type="text"
            placeholder="Search software, categories ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="rounded-r-xl p-2 h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
