import { NextResponse } from 'next/server';
import sql from 'mssql';

//written by: Jeffrey Billones
//re-written by: Annie Li

// Helper to ensure env variables are defined
function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

const config: sql.config = {
  user: getEnv("AZURE_SQL_USER"),
  password: getEnv("AZURE_SQL_PASSWORD"),
  server: getEnv("AZURE_SQL_SERVER"),
  database: getEnv("AZURE_SQL_DATABASE_LISTINGS"),
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function POST(req: Request) {
  let pool: sql.ConnectionPool | null = null;
  try {
    const body = await req.json();
    
    const {listingCreator, songName, genre, instruments} = body;

    const pool = await sql.connect(config);

    console.log({listingCreator, songName, instruments})

    const fillInst = [
      ...instruments,
      ...new Array(9 - instruments.length).fill('')
    ]

    console.log(fillInst);

    const randomID = Math.floor(Math.random()*127) + 1;

    console.log(randomID);

    await pool
      .request()
      .input("id", sql.Int, randomID)
      .input("songName", sql.NVarChar, songName)
      .input("genre", sql.NVarChar, genre)
      .input("p1", sql.NVarChar, fillInst[0])
      .input("p2", sql.NVarChar, fillInst[1])
      .input("p3", sql.NVarChar, fillInst[2])
      .input("p4", sql.NVarChar, fillInst[3])
      .input("p5", sql.NVarChar, fillInst[4])
      .input("p6", sql.NVarChar, fillInst[5])
      .input("p7", sql.NVarChar, fillInst[6])
      .input("p8", sql.NVarChar, fillInst[7])
      .input("p9", sql.NVarChar, fillInst[8])
      .query("INSERT INTO ListingTableReal (listid, listingCreator, songName, songGenre, pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9) VALUES (@id, '', @songName, @genre, @p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8, @p9)")
    await sql.close();
    return NextResponse.json({message: "Success"}, {status: 200});
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  } finally {
    if (pool && pool.connected) {
      await pool.close();
    }
  }
}
