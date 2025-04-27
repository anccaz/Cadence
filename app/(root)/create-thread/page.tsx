"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const instrumentOptions = [
  "Guitar",
  "Bass",
  "Drums",
  "Vocals",
  "Keyboards",
  "Piano",
  "Synthesizer",
  "Violin",
  "Cello",
  "Trumpet",
  "Saxophone",
  "Flute",
  "Clarinet",
  "Other",
];

const genreOptions = [
  "Rock",
  "Pop",
  "Hip Hop",
  "Electronic",
  "Jazz",
  "Classical",
  "Country",
  "Folk",
  "Blues",
  "Metal",
  "Reggae",
  "Other",
];

export default function CreatePostPage() {
  const [instruments, setInstruments] = useState<string[]>([]);
  const [songName, setSongName] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruments.length || !songName.trim() || !genre) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");

    // Save post to localStorage (instruments, songName, genre)
    const post = {
      instruments,
      songName,
      genre,
      createdAt: Date.now(),
    };
    const existingPosts = JSON.parse(localStorage.getItem("activity_posts") || "[]");
    localStorage.setItem("activity_posts", JSON.stringify([post, ...existingPosts]));

    // Redirect to activity page
    router.push("/activity");
  };

  const handleInstrumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setInstruments(selectedOptions);
  };

  return (
    <main className="font-serif flex flex-col items-center w-full bg-gradient-to-br from-white via-[#b9a9de] to-[#8C70C4] pt-16 pb-44">
      <section className="w-full max-w-3xl mt-12 mb-12 px-4 mx-auto">
        <h1 className="text-5xl font-extrabold text-[#8C70C4] mb-10 text-center">
          <span className="text-[#5D4197]">Find</span> Band Members
        </h1>
        <form
          className="bg-white rounded-3xl shadow-lg border-4 border-[#D6CBEF] p-8 flex flex-col gap-8 items-center"
          onSubmit={handleSubmit}
        >
          {/* Song Name */}
          <div className="flex flex-col items-center w-full">
            <label htmlFor="songName" className="text-xl text-[#7A5FB3] mb-2">
              Song Name & Artist:
            </label>
            <input
              type="text"
              id="songName"
              className="w-full max-w-md px-4 py-2 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition"
              placeholder="The Name of the Song & Artist (ex. Hello by Adele)"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              required
            />
          </div>

          {/* Instrument(s) Needed */}
          <div className="flex flex-col items-center w-full">
            <label htmlFor="instruments" className="text-xl text-[#7A5FB3] mb-2">
              Instrument(s) Needed:
            </label>
            <select
              id="instruments"
              multiple
              className="w-full max-w-md px-4 py-2 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition"
              value={instruments}
              onChange={handleInstrumentChange}
              required
            >
              {instrumentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="text-xs text-[#A694D6] mt-1">(Hold Ctrl/Cmd to select multiple)</span>
          </div>

          {/* Genre */}
          <div className="flex flex-col items-center w-full">
            <label htmlFor="genre" className="text-xl text-[#7A5FB3] mb-2">
              Genre:
            </label>
            <select
              id="genre"
              className="w-full max-w-md px-4 py-2 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            >
              {genreOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="w-full text-center text-red-500 font-semibold">{error}</div>
          )}
          <button
            type="submit"
            className="px-8 py-3 bg-[#B9A9DE] text-[#5D4197] rounded-full font-semibold text-lg shadow hover:bg-[#C8B8E5] transition"
          >
            Create Post
          </button>
        </form>
      </section>
    </main>
  );
}
