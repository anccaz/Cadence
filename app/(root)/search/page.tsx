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
    <main className="font-serif min-h-screen bg-gradient-to-br from-white via-[#b9a9de] to-[#8C70C4] pt-16 pb-32 flex flex-col items-center">
      <section className="w-full max-w-3xl mt-12 mb-12 px-4 mx-auto">
        <h1 className="text-5xl font-extrabold text-[#8C70C4] mb-10 text-center">
          <span className="text-[#5D4197]">User</span> Search
        </h1>
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-3xl shadow-lg border-4 border-[#D6CBEF] p-8 flex flex-col gap-8 items-center mb-10"
        >
          <div className="w-full flex flex-col gap-6 md:flex-row">
            <div className="flex-1 flex flex-col">
              <label htmlFor="username" className="text-xl text-[#7A5FB3] mb-2">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Search by username"
                value={searchParams.username}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition w-full"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="genre" className="text-xl text-[#7A5FB3] mb-2">Genre:</label>
              <input
                type="text"
                id="genre"
                name="genre"
                placeholder="Search by genre"
                value={searchParams.genre}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition w-full"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="instrument" className="text-xl text-[#7A5FB3] mb-2">Instrument:</label>
              <input
                type="text"
                id="instrument"
                name="instrument"
                placeholder="Search by instrument"
                value={searchParams.instrument}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-full border-2 border-[#B9A9DE] font-serif text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#B9A9DE] transition w-full"
              />
            </div>
          </div>
          <div className="flex gap-4 w-full justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-[#B9A9DE] text-[#5D4197] rounded-full font-semibold text-lg shadow hover:bg-[#C8B8E5] transition"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 bg-[#D6CBEF] text-[#5D4197] rounded-full font-semibold text-lg shadow hover:bg-[#B9A9DE] transition"
            >
              Reset
            </button>
          </div>
        </form>

        {loading && (
          <div className="text-center text-[#7A5FB3] text-xl font-semibold mb-6">
            Loading users...
          </div>
        )}
        {error && (
          <div className="w-full text-center text-red-500 font-semibold mb-6 bg-[#ffebee] border-l-4 border-[#f44336] py-2 px-4 rounded-xl">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="grid gap-6">
          {users.map(user => (
            <div
              key={user.id}
              className="bg-white rounded-2xl border-2 border-[#D6CBEF] shadow-lg p-6 flex flex-col gap-2"
            >
              <h3 className="text-2xl font-bold text-[#7A5FB3] mb-1">
                Username: <span className="text-[#5D4197]">{user.username || 'Not available'}</span>
              </h3>
              <p className="text-lg text-[#4B3F72]">Email: <span className="text-[#A694D6]">{user.email || 'N/A'}</span></p>
              <p className="text-lg text-[#4B3F72]">UserID: <span className="text-[#A694D6]">{user.id || 'N/A'}</span></p>
              <p className="text-lg text-[#4B3F72]">Instrument: <span className="text-[#A694D6]">{user.instrument || 'Any'}</span></p>
              <p className="text-lg text-[#4B3F72]">Genre Preference: <span className="text-[#A694D6]">{user.musicPref || 'Any'}</span></p>
            </div>
          ))}
        </div>
        {!loading && users.length === 0 && (
          <div className="text-center text-[#A694D6] text-xl mt-10">
            No users found matching your search criteria.
          </div>
        )}
      </section>
    </main>
  );
}
