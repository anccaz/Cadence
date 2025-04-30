'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  musicPref: string;
  instrument: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  users?: User[];
  count?: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState({
    username: '',
    genre: '',
    instrument: ''
  });

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const fetchUsers = async (params = searchParams): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const queryString = new URLSearchParams();
      if (params.username) queryString.append('username', params.username);
      if (params.genre) queryString.append('genre', params.genre);
      if (params.instrument) queryString.append('instrument', params.instrument);

      const url = `/api/users?${queryString.toString()}`;

      const res = await axios.get<ApiResponse>(url);

      if (!res.data.success) {
        throw new Error(res.data.message || 'Request failed');
      }

      setUsers(res.data.users || []);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(`Error ${err.response?.status}: ${err.response?.data?.message || err.message}`);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    fetchUsers();
  };

  const handleReset = (): void => {
    setSearchParams({
      username: '',
      genre: '',
      instrument: ''
    });
    fetchUsers({
      username: '',
      genre: '',
      instrument: ''
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>User Search</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'grid', gap: '15px' }}>
          <div>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Search by username"
              value={searchParams.username}
              onChange={handleInputChange}
              style={{ padding: '8px', width: '100%' }}
            />
          </div>
          <div>
            <label htmlFor="genre" style={{ display: 'block', marginBottom: '5px' }}>Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
              placeholder="Search by genre"
              value={searchParams.genre}
              onChange={handleInputChange}
              style={{ padding: '8px', width: '100%' }}
            />
          </div>
          <div>
            <label htmlFor="instrument" style={{ display: 'block', marginBottom: '5px' }}>Instrument:</label>
            <input
              type="text"
              id="instrument"
              name="instrument"
              placeholder="Search by instrument"
              value={searchParams.instrument}
              onChange={handleInputChange}
              style={{ padding: '8px', width: '100%' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                background: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={{
                padding: '8px 16px',
                background: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {loading && <p>Loading users...</p>}
      {error && (
        <div style={{
          padding: '10px',
          background: '#ffebee',
          borderLeft: '4px solid #f44336',
          marginBottom: '20px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={{ display: 'grid', gap: '20px' }}>
        {users.map(user => (
          <div key={user.id}
            style={{
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <h3>Username: {user.username || 'Not available'}</h3>
            <p>Email: {user.email || 'N/A'}</p>
            <p>UserID: {user.id || 'N/A'}</p>
            <p>Instrument: {user.instrument || 'Any'}</p>
            <p>Genre Preference: {user.musicPref || 'Any'}</p>
          </div>
        ))}
      </div>
      {!loading && users.length === 0 && (
        <p>No users found matching your search criteria</p>
      )}
    </div>
  );
}


// "use client";
// import React, { useState } from "react";

// // mock band data
// const bands = [
//   {
//     name: "Rockin Rollers",
//     genre: "Indie Rock",
//     image: "/band4.png",
//     lookingFor: "Drummer",
//     type: "band",
//   },
//   {
//     name: "Jazz Lovin'",
//     genre: "Jazz Fusion",
//     image: "/band3.png",
//     lookingFor: "Saxophonist",
//     type: "band",
//   },
//   {
//     name: "Comet Beats",
//     genre: "EDM",
//     image: "/band2.png",
//     lookingFor: "Vocalist",
//     type: "band",
//   },
//   {
//     name: "Lavender Dreams",
//     genre: "Pop",
//     image: "/band1.png",
//     lookingFor: "Guitarist",
//     type: "band",
//   },
//   {
//     name: "Smooth Coaster",
//     genre: "Classical",
//     image: "/band5.png",
//     lookingFor: "Bassist",
//     type: "band",
//   },
//   {
//     name: "Wiped Out",
//     genre: "Jazz",
//     image: "/band6.png",
//     lookingFor: "Trombone",
//     type: "band",
//   },
// ];

// // Mock musician data (user profiles)
// const musicians = [
//   {
//     name: "Cindy Tran",
//     instrument: "Keyboard",
//     genre: "Jazz, Rock",
//     image: "/musician1.png",
//     type: "musician",
//   },
//   {
//     name: "Mitchell Vu",
//     instrument: "Guitar",
//     genre: "Indie Pop",
//     image: "/musician2.png",
//     type: "musician",
//   },
//   {
//     name: "Alice Lock",
//     instrument: "Vocals",
//     genre: "Pop",
//     image: "/musician4.png",
//     type: "musician",
//   },
// ];

// // Combine bands and musicians for searching
// const allProfiles = [...bands, ...musicians];

// export default function SearchPage() {
//   const [query, setQuery] = useState("");

//   // Filter bands and musicians by name or genre (case-insensitive)
//   const filteredProfiles = allProfiles.filter(
//     (profile) =>
//       profile.name.toLowerCase().includes(query.toLowerCase()) ||
//       (profile.genre && profile.genre.toLowerCase().includes(query.toLowerCase())) ||
//       (profile.instrument && profile.instrument.toLowerCase().includes(query.toLowerCase()))
//   );

//   return (
//     <main className="font-serif flex flex-col items-center w-full bg-gradient-to-br from-white via-[#b9a9de] to-[#8C70C4] pt-16 pb-44">
//       {/* Search Section */}
//       <section className="w-full max-w-4xl mt-12 mb-12 px-4 mx-auto">
//         <h1 className="text-5xl font-extrabold text-[#8C70C4] mb-10 text-center">
//           <span className="text-[#5D4197]">Search</span> for Bands and Musicians
//         </h1>
//         <div className="flex justify-center mb-12">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search by name, genre, or instrument..."
//             className="w-full max-w-2xl px-8 py-5 rounded-full border-none outline-none bg-[#121212] text-white placeholder-[#B9A9DE] font-serif text-2xl shadow-lg focus:ring-4 focus:ring-[#B9A9DE] transition"
//             style={{ fontSize: "2rem" }}
//           />
//         </div>
//       </section>

//       {/* Filtered Results */}
//       <section className="w-full max-w-5xl px-4 mb-16 mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//           {filteredProfiles.length > 0 ? (
//             filteredProfiles.map((profile, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 border-4 border-[#D6CBEF] flex flex-col items-center"
//               >
//                 <img
//                   src={profile.image}
//                   alt={profile.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6 w-full text-center">
//                   <h3 className="text-2xl font-bold text-[#7A5FB3] mb-2">{profile.name}</h3>
//                   {profile.type === "band" ? (
//                     <>
//                       <p className="text-lg text-[#A694D6] mb-1">{profile.genre}</p>
//                       <span className="inline-block mt-2 px-4 py-2 bg-[#E0D6F3] text-[#7A5FB3] rounded-full font-semibold">
//                         Looking for: {profile.lookingFor}
//                       </span>
//                     </>
//                   ) : (
//                     <>
//                       <p className="text-lg text-[#A694D6] mb-1">Instrument: {profile.instrument}</p>
//                       <p className="text-lg text-[#A694D6] mb-1">Genre: {profile.genre}</p>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-3 text-center text-[#4B3F72] text-2xl font-serif mt-8">
//               No bands or musicians found matching your search.
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }
