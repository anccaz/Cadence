import { NextResponse } from 'next/server';
import sql from 'mssql';

//go to [url]/api/products to check if it works
//CURRENTLY does not work for remote connections atm, may have to swap to Cloud-based Database in the future

const config = {
  user: 'sysAdmin',                    //SQL Server User
  password: 'p4ss-w0rd',                //SQL Server PW
  server: 'cadencedatabases.database.windows.net',        //named instane, change to DB server name (usally name of computer)  
  database: 'Listings',                //name of database
  options: {
    encrypt: true,                 //keep false for local, true for public
    trustServerCertificate: true,   //keep true to avoid self-signed cert errors
  },
};

export async function GET() {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM ListingTableReal`; //Swap as needed
    await sql.close();
    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}
