import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { env } from "../config/env";
import * as schema from "./schema";

console.log('Initializing database connection...');
console.log('Using DATABASE_URL from env config');

const pool = new Pool({ connectionString: env.DATABASE_URL });

// Test the connection
pool.query('SELECT 1').then(() => {
  console.log('✅ Database connection successful');
}).catch((error) => {
  console.error('❌ Database connection failed:', error.message);
});

export const db = drizzle(pool, { schema });