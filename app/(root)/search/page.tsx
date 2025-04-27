"use client";
import React, { useState } from "react";

// 6 consistent fake bands
const bands = [
  {
    name: "Rockin Rollers",
    genre: "Indie Rock",
    image: "/utdallas1.png",
    lookingFor: "Drummer",
  },
  {
    name: "Jazz Lovin'",
    genre: "Jazz Fusion",
    image: "/utdallas2.png",
    lookingFor: "Saxophonist",
  },
  {
    name: "Comet Beats",
    genre: "EDM",
    image: "/utdallas3.png",
    lookingFor: "Vocalist",
  },
  {
    name: "Lavender Dreams",
    genre: "Pop",
    image: "/utdallas1.png",
    lookingFor: "Guitarist",
  },
  {
    name: "Purple Haze",
    genre: "Psychedelic Rock",
    image: "/utdallas2.png",
    lookingFor: "Bassist",
  },
  {
    name: "White Noise",
    genre: "Alternative",
    image: "/utdallas3.png",
    lookingFor: "Keyboardist",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  // Filter bands by name or genre (case-insensitive)
  const filteredBands = bands.filter(
    (band) =>
      band.name.toLowerCase().includes(query.toLowerCase()) ||
      band.genre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="font-serif flex flex-col items-center w-full bg-gradient-to-br from-white via-[#b9a9de] to-[#8C70C4] pt-16 pb-44">
      {/* Search Section */}
      <section className="w-full max-w-4xl mt-12 mb-12 px-4 mx-auto">
        <h1 className="text-5xl font-extrabold text-[#8C70C4] mb-10 text-center">
          <span className="text-[#5D4197]">Search</span> for Bands
        </h1>
        <div className="flex justify-center mb-12">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by band name or genre..."
            className="w-full max-w-2xl px-8 py-5 rounded-full border-none outline-none bg-[#121212] text-white placeholder-[#B9A9DE] font-serif text-2xl shadow-lg focus:ring-4 focus:ring-[#B9A9DE] transition"
            style={{ fontSize: "2rem" }}
          />
        </div>
      </section>

      {/* Filtered Bands */}
      <section className="w-full max-w-5xl px-4 mb-16 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredBands.length > 0 ? (
            filteredBands.map((band, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 border-4 border-[#D6CBEF] flex flex-col items-center"
              >
                <img
                  src={band.image}
                  alt={band.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 w-full text-center">
                  <h3 className="text-2xl font-bold text-[#7A5FB3] mb-2">{band.name}</h3>
                  <p className="text-lg text-[#A694D6] mb-1">{band.genre}</p>
                  <span className="inline-block mt-2 px-4 py-2 bg-[#E0D6F3] text-[#7A5FB3] rounded-full font-semibold">
                    Looking for: {band.lookingFor}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-[#4B3F72] text-2xl font-serif mt-8">
              No bands found matching your search.
            </div>
          )}
        </div>
      </section>

      {/* Optional: Footer for consistency */}
      <footer className="w-full py-8 text-center text-[#5D4197] text-sm">
        &copy; {new Date().getFullYear()} Cadence. Not affiliated with UT Dallas.
      </footer>
    </main>
  );
}
