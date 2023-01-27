import * as dotenv from "dotenv";
dotenv.config();

export const {
  APP_PORT,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  MONGODB_URL,
  OPENAI_API_KEY,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  DEV_API,
  PROD_API,
  CLIENT_DEV_API,
  CLIENT_PROD_API,
  MODE,
  REDIS_PORT,
  REDIS_HOST,
  REDIS_PASSWORD,
} = process.env;
