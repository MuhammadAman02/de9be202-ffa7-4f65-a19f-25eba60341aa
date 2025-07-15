import { envsafe, str, port } from "envsafe";
import dotenv from "dotenv";

dotenv.config();

export const env = envsafe({
  DATABASE_URL: str(),
  JWT_SECRET: str({
    default: "your-super-secret-jwt-key-change-this-in-production",
    desc: "JWT secret for token signing"
  }),
  PORT: port({ default: 3000 }),
});