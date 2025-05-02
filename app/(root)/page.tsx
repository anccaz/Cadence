"use client";
import React from "react";
import { useRouter } from 'next/navigation';

const sampleBands = [
  {
    name: "Rolltide",
    genre: "Indie Rock",
    image: "/utdallas1.png",
    lookingFor: "Drummer",
  },
  {
    name: "Galaxy Jammers",
    genre: "Jazz Fusion",
    image: "/utdallas2.png",
    lookingFor: "Saxophonist",
  },
  {
    name: "Nebula",
    genre: "EDM",
    image: "/utdallas3.png",
    lookingFor: "Vocalist",
  },
];

export default function HomePage() {
  const router = useRouter(); // Instantiate useRouter *inside* the component

  const handleGetStartedClick = () => {
    router.push('/profile');
  };

  return (
    <main className="font-serif flex flex-col items-center w-full bg-gradient-to-br from-white via-[#b9a9de] to-[#8C70C4] pt-16 pb-44">
      {/* Hero Section */}
      <section className="w-full max-w-4xl mb-12 px-4 mx-auto">
        <h1 className="text-5xl font-extrabold text-[#8C70C4] drop-shadow-lg mb-6 text-center">
          Find Your Band at <span className="text-[#5D4197]">UT Dallas</span>
        </h1>
        <p className="text-xl text-[#7A5FB3] mb-8 text-center">
          Meet fellow Comets, form bands, and create music you love. Whether you play, sing, or produce, discover your next bandmates right here on campus!
        </p>
        <div className="flex justify-center">
          <button
            className="px-8 py-4 bg-[#B9A9DE] text-[#5D4197] rounded-full font-semibold text-lg shadow-lg hover:bg-[#C8B8E5] transition"
            onClick={handleGetStartedClick} // Add the onClick handler
          >
            Current Listings
          </button>
        </div>
      </section>

      {/* Featured Bands Looking for Members */}
      <section className="w-full max-w-5xl px-4 mb-16 mx-auto">
        <h2 className="text-3xl font-bold text-[#8C70C4] mb-8 text-center">
          Bands Looking for Members
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sampleBands.map((band, idx) => (
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
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full max-w-4xl px-4 mb-24 mx-auto">
        <h2 className="text-2xl font-bold text-[#8C70C4] mb-6 text-center">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="flex-1 bg-[#E0D6F3] rounded-xl p-6 text-[#7A5FB3] shadow-lg">
            <h3 className="text-xl font-semibold mb-2">1. Create Your Profile</h3>
            <p>
              Share your musical interests, skills, and what kind of band you want to join or start.
            </p>
          </div>
          <div className="flex-1 bg-[#E0D6F3] rounded-xl p-6 text-[#7A5FB3] shadow-lg">
            <h3 className="text-xl font-semibold mb-2">2. Discover Bands & Musicians</h3>
            <p>
              Browse bands looking for members or search for musicians by instrument, genre, or style.
            </p>
          </div>
          <div className="flex-1 bg-[#E0D6F3] rounded-xl p-6 text-[#7A5FB3] shadow-lg">
            <h3 className="text-xl font-semibold mb-2">3. Connect & Jam</h3>
            <p>
              Message other students, set up jam sessions, and start making music together!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-[#5D4197] text-sm">
        &copy; {new Date().getFullYear()} Cadence. Not affiliated with UT Dallas.
      </footer>
    </main>
  );
}
