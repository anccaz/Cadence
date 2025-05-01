// app/listings/page.tsx
'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface Listing {
  id: number
  creator: string
  songName: string
  genre: string
  positions: string[]
}

interface ApiResponse {
  success: boolean
  message?: string
  listings?: Listing[]
  count?: number
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState({
    creator: '',
    songName: '',
    genre: '',
    position: ''
  })

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async (params = searchParams): Promise<void> => {
    setLoading(true);
    setError(null);
  
    try {
      const queryString = new URLSearchParams();
      if (params.creator) queryString.append('creator', params.creator);
      if (params.songName) queryString.append('songName', params.songName);
      if (params.genre) queryString.append('genre', params.genre);
      if (params.position) queryString.append('position', params.position);
  
      const url = `/api/listings?${queryString.toString()}`;
      console.log('Making request to:', url);
  
      const res = await axios.get<ApiResponse>(url);
      console.log('API Response:', res.data);
  
      if (!res.data.success) {
        throw new Error(res.data.message || 'Request failed');
      }
  
      setListings(res.data.listings || []);
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
    fetchListings()
  }

  const handleReset = (): void => {
    setSearchParams({
      creator: '',
      songName: '',
      genre: '',
      position: ''
    })
    fetchListings({
      creator: '',
      songName: '',
      genre: '',
      position: ''
    })
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Listing Search</h1>
      
      {/* Search form */}
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'grid', gap: '15px' }}>
          <div>
            <label htmlFor="creator" style={{ display: 'block', marginBottom: '5px' }}>Creator:</label>
            <input
              type="text"
              id="creator"
              name="creator"
              placeholder="Search by creator"
              value={searchParams.creator}
              onChange={handleInputChange}
              style={{ padding: '8px', width: '100%' }}
            />
          </div>
          
          <div>
            <label htmlFor="songName" style={{ display: 'block', marginBottom: '5px' }}>Song Name:</label>
            <input
              type="text"
              id="songName"
              name="songName"
              placeholder="Search by song name"
              value={searchParams.songName}
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
            <label htmlFor="position" style={{ display: 'block', marginBottom: '5px' }}>Position:</label>
            <input
              type="text"
              id="position"
              name="position"
              placeholder="Search by position (e.g., Guitar, Drums)"
              value={searchParams.position}
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
      {loading && <p>Loading listings...</p>}
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
        {listings.map(listing => (
          <div key={`listing-${listing.id}`}
            style={{ 
              padding: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '4px'
            }}
          >
            <h3>Song: {listing.songName || 'Not available'}</h3>
            <p>Creator: {listing.creator || 'N/A'}</p>
            <p>Genre: {listing.genre || 'N/A'}</p>
            <p>Positions Needed:</p>
            <ul>
              {listing.positions.map((pos, index) => (
                <li key={`pos-${listing.id}-${index}`}>{pos}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
        
      {!loading && listings.length === 0 && (
        <p>No listings found matching your search criteria</p>
      )}
    </div>
  )
}