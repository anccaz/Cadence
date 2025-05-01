// lib/db.ts
import sql from 'mssql';

const dbConfig: sql.config = {
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  server: process.env.AZURE_SQL_SERVER,
  database: process.env.AZURE_SQL_DATABASE,
  options: {
    encrypt: true, // Required for Azure
    trustServerCertificate: false,
    connectTimeout: 30000,
    requestTimeout: 30000,
    authentication: { type: 'default' }
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool: sql.ConnectionPool | null = null;

export async function connectToDatabase() {
  if (pool && pool.connected) return pool;
  pool = await new sql.ConnectionPool(dbConfig).connect();
  return pool;
}

export async function closeConnection() {
  if (pool && pool.connected) {
    await pool.close();
    pool = null;
  }
}
