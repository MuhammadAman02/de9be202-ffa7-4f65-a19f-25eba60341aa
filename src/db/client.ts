import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

console.log('Initializing database connection...');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Test the connection
pool.query('SELECT 1').then(() => {
  console.log('Database connection successful');
}).catch((error) => {
  console.error('Database connection failed:', error);
});

export const db = drizzle(pool, { schema });