"use client";
import React, { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy search logic: just echo the query for demonstration
    if (query.trim()) {
      setResults([`You searched for: "${query}"`]);
    } else {
      setResults([]);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full ml-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Search</h1>
      <form
        onSubmit={handleSearch}
        className="w-full flex flex-col items-center"
      >
        <input
          type="text"
          className="w-full max-w-2xl text-xl px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
          placeholder="Type to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
      {/* Search Results */}
      <div className="mt-12 w-full max-w-2xl">
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200 text-center text-gray-700">
            {results.map((result, idx) => (
              <div key={idx}>{result}</div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

