// app/api/listings/route.js
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import sql from 'mssql'

export async function GET(request) {
  console.log('Listings API Endpoint Hit:', request.url);
  
  let pool = null;
  try {
    const { searchParams } = new URL(request.url);
    console.log('Search Params:', Object.fromEntries(searchParams.entries()));
    
    const creator = searchParams.get('creator') || '';
    const songName = searchParams.get('songName') || '';
    const genre = searchParams.get('genre') || '';
    const position = searchParams.get('position') || '';
    
    pool = await connectToDatabase();
    
    let query = `
      SELECT 
        listid, 
        listingCreator, 
        songName, 
        songGenre,
        pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9
      FROM dbo.ListingTableReal
      WHERE 1=1
    `;
    
    const requestObj = pool.request();

    if (creator) {
      query += ' AND listingCreator LIKE @creator';
      requestObj.input('creator', sql.NVarChar, `%${creator}%`);
    }
    
    if (songName) {
      query += ' AND songName LIKE @songName';
      requestObj.input('songName', sql.NVarChar, `%${songName}%`);
    }
    
    if (genre) {
      query += ' AND songGenre LIKE @genre';
      requestObj.input('genre', sql.NVarChar, `%${genre}%`);
    }
    
    if (position) {
      // Search across all position columns
      query += ' AND (pos1 LIKE @position OR pos2 LIKE @position OR pos3 LIKE @position OR pos4 LIKE @position OR pos5 LIKE @position OR pos6 LIKE @position OR pos7 LIKE @position OR pos8 LIKE @position OR pos9 LIKE @position)';
      requestObj.input('position', sql.NVarChar, `%${position}%`);
    }

    query += ' ORDER BY listid DESC';

    const result = await requestObj.query(query);
    
    if(result.recordset.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No listings found matching your criteria'},
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      listings: result.recordset.map(listing => ({
        id: listing.listid,
        creator: listing.listingCreator,
        songName: listing.songName,
        genre: listing.songGenre,
        positions: [
          listing.pos1,
          listing.pos2,
          listing.pos3,
          listing.pos4,
          listing.pos5,
          listing.pos6,
          listing.pos7,
          listing.pos8,
          listing.pos9
        ].filter(pos => pos) // Remove empty positions
      })),
      count: result.recordset.length
    });

  } catch (error) {
    console.error('Full error stack:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Database operation failed',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  } finally {
    if (pool && pool.connected) { 
      try {
        await pool.close();
      } catch (closeError) {
        console.error('Error closing connection:', closeError);
      }
    }
  }
}