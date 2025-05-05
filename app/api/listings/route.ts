import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import sql from 'mssql';

//written by: Luis Lopez

export async function GET(request: Request) {
  let pool: sql.ConnectionPool | null = null;
  try {
    const { searchParams } = new URL(request.url);

    const creator = searchParams.get('creator') || '';
    const songName = searchParams.get('songName') || '';
    const genre = searchParams.get('genre') || '';
    const position = searchParams.get('position') || '';

    pool = await connectToDatabase(process.env.AZURE_SQL_DATABASE_LISTINGS!);

    // Debug: Confirm correct DB
    const dbNameResult = await pool.request().query('SELECT DB_NAME() AS dbname');
    console.log('LISTINGS API: Connected to database:', dbNameResult.recordset[0].dbname);

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
      query += ' AND (pos1 LIKE @position OR pos2 LIKE @position OR pos3 LIKE @position OR pos4 LIKE @position OR pos5 LIKE @position OR pos6 LIKE @position OR pos7 LIKE @position OR pos8 LIKE @position OR pos9 LIKE @position)';
      requestObj.input('position', sql.NVarChar, `%${position}%`);
    }

    query += ' ORDER BY listid DESC';

    const result = await requestObj.query(query);

    if (result.recordset.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No listings found matching your criteria' },
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
        ].filter(pos => pos)
      })),
      count: result.recordset.length
    });

  } catch (error: any) {
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
      await pool.close();
    }
  }
}
