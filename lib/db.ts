import sql from 'mssql';

const baseConfig = {
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  server: process.env.AZURE_SQL_SERVER,
  options: {
    encrypt: true,
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

const pools: { [dbName: string]: sql.ConnectionPool } = {};

export async function connectToDatabase(databaseName: string) {
  if (pools[databaseName] && pools[databaseName].connected) return pools[databaseName];
  const config = { ...baseConfig, database: databaseName };
  const pool = await new sql.ConnectionPool(config).connect();
  pools[databaseName] = pool;
  return pool;
}
