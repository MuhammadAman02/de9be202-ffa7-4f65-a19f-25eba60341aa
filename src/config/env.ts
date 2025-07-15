import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

import { envsafe, str, port } from "envsafe";

console.log('Loading environment variables...');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL length:', process.env.DATABASE_URL?.length || 0);

export const env = envsafe({
  DATABASE_URL: str({
    desc: "PostgreSQL connection string"
  }),
  JWT_SECRET: str({
    default: "your-super-secret-jwt-key-change-this-in-production",
    desc: "JWT secret for token signing"
  }),
  PORT: port({ default: 3000 }),
});

console.log('Environment variables loaded successfully');