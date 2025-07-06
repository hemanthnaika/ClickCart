import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  IK_URL_ENDPOINT,
  IK_PUBLIC_KEY,
  IK_PRIVATE_KEY,
} = process.env;
