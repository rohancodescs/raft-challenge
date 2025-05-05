// import pkg from 'pg';
// const { Pool } = pkg;

// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,  // Supabase self-signed cert
//   },
// });

import pg from "pg";
export const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
