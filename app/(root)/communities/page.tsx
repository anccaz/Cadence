"use client";
import React from "react";

type BandMember = {
  name: string;
  instrument: string;
};

type Band = {
  id: string;
  name: string;
  genre: string;
  members: BandMember[];
};

const fakeBands: Band[] = [
  {
    id: "1",
    name: "The Purple Haze",
    genre: "Psychedelic Rock",
    members: [
      { name: "Jimi Hendrix", instrument: "Guitar/Vocals" },
      { name: "Noel Ghosh", instrument: "Bass" },
      { name: "Mitch Jain", instrument: "Drums" },
    ],
  },
  {
    id: "2",
    name: "Crimson Shadows",
    genre: "Gothic Metal",
    members: [
      { name: "Aliza Kumar", instrument: "Vocals" },
      { name: "Victor Shadow", instrument: "Guitar" },
      { name: "Isha Jindal", instrument: "Keyboards" },
      { name: "Sam Blackwood", instrument: "Drums" },
    ],
  },
  {
    id: "3",
    name: "Neon Tide",
    genre: "Synthwave",
    members: [
      { name: "Rina Synth", instrument: "Synthesizer/Vocals" },
      { name: "Kai Liu", instrument: "Synthesizer" },
    ],
  },
  {
    id: "4",
    name: "Ironclad Giants",
    genre: "Stoner Rock",
    members: [
      { name: "Ginny Stone", instrument: "Guitar/Vocals" },
      { name: "Magnus Agarwal", instrument: "Bass" },
      { name: "Astrid Smith", instrument: "Drums" },
    ],
  },
  {
    id: "5",
    name: "Velvet Echoes",
    genre: "Dream Pop",
    members: [
      { name: "Lila Patel", instrument: "Vocals/Guitar" },
      { name: "Jerry Echo", instrument: "Bass/Keys" },
    ],
  },
  {
    id: "6",
    name: "Static Void",
    genre: "Noise Rock",
    members: [
      { name: "Rex Static", instrument: "Guitar/Vocals" },
      { name: "Ava Gupta", instrument: "Bass" },
      { name: "Vihaan Chen", instrument: "Electronics" },
    ],
  },
  {
    id: "7",
    name: "Lunar Bloom",
    genre: "Indie Folk",
    members: [
      { name: "Ava Choi", instrument: "Vocals/Guitar" },
      { name: "Rowan Bloom", instrument: "Banjo/Mandolin" },
    ],
  },
  {
    id: "8",
    name: "Electric Nomads",
    genre: "Desert Rock",
    members: [
      { name: "Bernice Roads", instrument: "Guitar/Vocals" },
      { name: "Sandy Beats", instrument: "Drums" },
      { name: "Cindy Kim", instrument: "Bass" },
    ],
  },
  {
    id: "9",
    name: "Spectral Hues",
    genre: "Progressive Electronic",
    members: [
      { name: "Indra Gupta", instrument: "Synthesizers" },
      { name: "Cyan Sato", instrument: "Programming" },
    ],
  },
];

export default function BandsPage() {
  return (
    <main className="font-serif flex flex-col items-center w-full bg-gradient-to-br from-white via-[#b9a9de] to-[#8C70C4] pt-16 pb-44">
      <section className="w-full max-w-4xl mt-12 mb-12 px-4 mx-auto">
        <h1 className="text-5xl font-extrabold text-[#8C70C4] mb-10 text-center">
          <span className="text-[#5D4197]">Bands</span> Directory
        </h1>
        <div className="flex flex-col gap-8">
          {fakeBands.map((band) => (
            <div
              key={band.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border-4 border-[#D6CBEF] flex flex-col items-center p-6"
            >
              <h2 className="text-3xl text-[#7A5FB3] mb-2">{band.name}</h2>
              <p className="text-xl text-[#A694D6] mb-4">Genre: {band.genre}</p>
              <h3 className="text-2xl text-[#7A5FB3] mb-2">Members:</h3>
              <ul className="text-left">
                {band.members.map((member, index) => (
                  <li key={index} className="text-xl text-[#4B3F72]">
                    <span className="font-semibold">{member.name}:</span> {member.instrument}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
