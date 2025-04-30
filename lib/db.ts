// lib/db.ts
import sql from 'mssql';

const dbConfig = {
  user: process.env.AZURE_SQL_USER || 'sysAdmin',
  password: process.env.AZURE_SQL_PASSWORD || 'p4ss-w0rd',
  server: process.env.AZURE_SQL_SERVER || 'cadencedatabases.database.windows.net',
  database: process.env.AZURE_SQL_DATABASE || 'Listings',
  options: {
    encrypt: true, // Mandatory for Azure
    trustServerCertificate: false, // Important for production
    connectTimeout: 30000, // Increased timeout to 30 seconds
    requestTimeout: 30000, // Increased timeout to 30 seconds
    cancelTimeout: 5000,
   // Add these for better Azure compatibility:
   authentication: {
    type: 'default'
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
}
};

let pool: sql.ConnectionPool;

export async function connectToDatabase() {
  if (pool?.connected) return pool;
  
  try {
    pool = await new sql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('Connected to MSSQL database');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

export async function closeConnection() {
  try {
    if (pool?.connected) {
      await pool.close();
      console.log('Connection closed');
    }
  }
  catch (err){
    console.error('Error closing connection:', err);
  }
}
