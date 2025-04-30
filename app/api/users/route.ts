import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import sql from 'mssql';

export async function GET(request: Request) {
  let pool: sql.ConnectionPool | null = null;
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || '';
    const genre = searchParams.get('genre') || '';
    const instrument = searchParams.get('instrument') || '';

    pool = await connectToDatabase();

    let query = 'SELECT UserId, Username, Email, GenrePref, InstrumentPref FROM dbo.UserTableReal1 WHERE 1=1';
    const requestObj = pool.request();

    if (username) {
      query += ' AND Username LIKE @username';
      requestObj.input('username', sql.NVarChar, `%${username}%`);
    }
    if (genre) {
      query += ' AND GenrePref LIKE @genre';
      requestObj.input('genre', sql.NVarChar, `%${genre}%`);
    }
    if (instrument) {
      query += ' AND InstrumentPref LIKE @instrument';
      requestObj.input('instrument', sql.NVarChar, `%${instrument}%`);
    }

    query += ' ORDER BY UserId DESC';

    const result = await requestObj.query(query);

    if (result.recordset.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No users found matching your criteria' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      users: result.recordset.map(user => ({
        id: user.UserId,
        username: user.Username,
        email: user.Email,
        musicPref: user.GenrePref,
        instrument: user.InstrumentPref
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
