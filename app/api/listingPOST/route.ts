import { NextResponse } from 'next/server';
import sql from 'mssql';


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
  database: getEnv("AZURE_SQL_DATABASE"),
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function POST(req: Request) {
  let pool: sql.ConnectionPool | null = null;
  try {
    const body = await req.json();
    const { id, username, email, instrument, genre } = body;

    pool = await sql.connect(config);

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("username", sql.NVarChar, username)
      .input("email", sql.NVarChar, email)
      .input("inst", sql.NVarChar, instrument)
      .input("genre", sql.NVarChar, genre)
      .query(
        "INSERT INTO UserTableReal1 (Userid, UserName, pw, Email, Phone, Insta, GenrePref, InstrumentPref) VALUES (@id, @username, '', @email, '', '', @genre, @inst)"
      );
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  } finally {
    if (pool && pool.connected) {
      await pool.close();
    }
  }
}
