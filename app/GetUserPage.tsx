'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface User {
  id: number
  username: string
  email: string
  phone: string
  musicPref: string
  instrument: string
}

interface ApiResponse {
  success: boolean
  message?: string
  users?: User[]
  count?: number
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState({
    username: '',
    genre: '',
    instrument: ''
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async (params = searchParams): Promise<void> => {
    setLoading(true);
    setError(null);
  
    try {
      const queryString = new URLSearchParams();
      if (params.username) queryString.append('username', params.username);
      if (params.genre) queryString.append('genre', params.genre);
      if (params.instrument) queryString.append('instrument', params.instrument);
  
      // Debugging: Log the URL before making the request
      const url = `/api/users?${queryString.toString()}`;
      console.log('Making request to:', url);
  
      const res = await axios.get<ApiResponse>(url);
      
      // Debugging: Log the response
      console.log('API Response:', res.data);
  
      if (!res.data.success) {
        throw new Error(res.data.message || 'Request failed');
      }
  
      setUsers(res.data.users || []);
    } catch (err) {
      console.error('Full error:', err);
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
    const { name, value } = e.target
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault()
    fetchUsers()
  }

  const handleReset = (): void => {
    setSearchParams({
      username: '',
      genre: '',
      instrument: ''
    })
    fetchUsers({
      username: '',
      genre: '',
      instrument: ''
    })
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>User Search</h1>
      
      {/* Search form */}
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
      
      {/* Loading and error states */}
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
      
      {/* Results */}
      <div style={{ display: 'grid', gap: '20px' }}>
  {users.map(user => {
    const uniqueKey = `user-${user.id}-${user.email}-${Math.random().toString(36).substr(2, 5)}`;
    return (
      <div key={uniqueKey}
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
    )
  })}
</div>
        
        {!loading && users.length === 0 && (
          <p>No users found matching your search criteria</p>
        )}
      </div>
  )
}
