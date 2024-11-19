"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search software..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="p-2 border rounded"
      />
    </div>
  );
}