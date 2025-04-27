"use client";
import React, { useEffect, useState } from "react";

const instrumentOptions = [
  "Guitar",
  "Harp",
  "Banjo",
  "Ukulele",
  "Bassoon",
  "Oboe",
  "Bass",
  "Drums",
  "Vocals",
  "Keyboards",
  "Piano",
  "Synthesizer",
  "Violin",
  "Viola",
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

type Profile = {
  name: string;
  image: string;
  instruments: string[];
  genres: string[];
  bio: string;
};

const defaultProfileImage = "/profile.png";

export default function UserProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    image: defaultProfileImage,
    instruments: [],
    genres: [],
    bio: "",
  });
  const [savedProfile, setSavedProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(true);

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
      setSavedProfile(JSON.parse(storedProfile));
      setEditing(false);
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, name: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInstrumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setProfile({ ...profile, instruments: selectedOptions });
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setProfile({ ...profile, genres: selectedOptions });
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfile({ ...profile, bio: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setSavedProfile(profile);
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <main className="font-serif flex flex-col items-center w-full bg-gradient-to-br from-white via-[#b9a9de] to-[#8C70C4] pt-16 pb-44 min-h-screen">
      <section className="w-full max-w-4xl mt-12 mb-12 px-4 mx-auto">
        <h1 className="text-5xl font-extrabold text-[#8C70C4] mb-10 text-center">
          <span className="text-[#5D4197]">{editing ? "Create" : "Your"}</span> Profile
        </h1>
        {editing ? (
          <form
            onSubmit={handleSave}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border-4 border-[#D6CBEF] flex flex-col items-center p-6 gap-4"
          >
            {/* Name Input */}
            <div className="flex flex-col items-center w-full">
              <label htmlFor="name" className="text-xl text-[#7A5FB3] mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={profile.name}
                onChange={handleNameChange}
                placeholder="Your Name"
                required
                className="w-full max-w-md px-4 py-2 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition"
              />
            </div>
            {/* Image Upload */}
            <div className="flex flex-col items-center">
              <img
                src={profile.image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-2"
              />
              <label className="px-4 py-1 bg-[#B9A9DE] text-[#5D4197] rounded-full font-semibold text-sm shadow hover:bg-[#C8B8E5] transition cursor-pointer">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Instrument Selection */}
            <div className="flex flex-col items-center w-full">
              <label htmlFor="instruments" className="text-xl text-[#7A5FB3] mb-2">
                Instrument(s):
              </label>
              <select
                id="instruments"
                multiple
                value={profile.instruments}
                onChange={handleInstrumentChange}
                required
                className="w-full max-w-md px-4 py-2 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition"
              >
                {instrumentOptions.map((instrument) => (
                  <option key={instrument} value={instrument}>
                    {instrument}
                  </option>
                ))}
              </select>
              <span className="text-xs text-[#A694D6] mt-1">(Hold Ctrl/Cmd to select multiple)</span>
            </div>

            {/* Genre Selection */}
            <div className="flex flex-col items-center w-full">
              <label htmlFor="genres" className="text-xl text-[#7A5FB3] mb-2">
                Genre(s):
              </label>
              <select
                id="genres"
                multiple
                value={profile.genres}
                onChange={handleGenreChange}
                required
                className="w-full max-w-md px-4 py-2 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition"
              >
                {genreOptions.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <span className="text-xs text-[#A694D6] mt-1">(Hold Ctrl/Cmd to select multiple)</span>
            </div>

            {/* Bio */}
            <div className="flex flex-col items-center w-full">
              <label htmlFor="bio" className="text-xl text-[#7A5FB3] mb-2">
                Bio:
              </label>
              <textarea
                id="bio"
                value={profile.bio}
                onChange={handleBioChange}
                placeholder="Tell us about yourself and what band you're looking create/join"
                required
                className="w-full max-w-md px-4 py-2 rounded-2xl border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition"
                rows={4}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-2 bg-[#5D4197] text-white rounded-full font-semibold shadow hover:bg-[#4B3F72] transition"
            >
              Save Profile
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border-4 border-[#D6CBEF] flex flex-col items-center p-8 gap-4 relative">
            <img
              src={savedProfile?.image || defaultProfileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-2"
            />
            <h2 className="text-3xl font-bold text-[#5D4197]">{savedProfile?.name}</h2>
            <p className="text-xl text-[#7A5FB3]">
              Instrument(s): {savedProfile?.instruments?.join(", ") || "None"}
            </p>
            <p className="text-xl text-[#7A5FB3]">
              Genre(s): {savedProfile?.genres?.join(", ") || "None"}
            </p>
            <p className="text-lg text-[#4B3F72] text-center whitespace-pre-line">{savedProfile?.bio}</p>
            <button
              onClick={handleEdit}
              className="absolute top-4 right-4 px-4 py-1 bg-[#B9A9DE] text-[#5D4197] rounded-full font-semibold text-sm shadow hover:bg-[#C8B8E5] transition"
            >
              Edit Profile
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
