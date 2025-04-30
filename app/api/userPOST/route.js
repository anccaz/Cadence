import { NextResponse } from 'next/server';
import sql from 'mssql';

/**
 * POST Request Route.js for User DB
 * Note: in the future change config to a file outside of this file
 * and encrypt it
 */

const config = {
  user: 'sysAdmin',                    //SQL Server User
  password: 'p4ss-w0rd',                //SQL Server PW
  server: 'cadencedatabases.database.windows.net',        //named instane, change to DB server name (usally name of computer)  
  database: 'Users',                //name of database
  options: {
    encrypt: true,                 //keep false for local, true for public
    trustServerCertificate: true,   //keep true to avoid self-signed cert errors
  },
};

export async function POST(req){
  try {
    const body = await req.json();

    const {id, username, email, instrument, genre} = body;

    const pool = await sql.connect(config);

    console.log({username, email, instrument, genre})

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("username", sql.NVarChar, username)
      .input("email", sql.NVarChar, email)
      .input("inst", sql.NVarChar, instrument)
      .input("genre", sql.NVarChar, genre)
      .query("INSERT INTO UserTableReal1 (Userid, UserName, pw, Email, Phone, Insta, GenrePref, InstrumentPref) VALUES (@id, @username, '', @email, '', '', @genre, @inst)")
    await sql.close();
    return NextResponse.json({message: "Success"}, {status: 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}
