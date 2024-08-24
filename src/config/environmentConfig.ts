import dotenv from "dotenv";

dotenv.config();

const envFound = dotenv.config();
if (envFound.error && process.env.NODE_ENV != "test") {
  throw new Error("Couldn't find .env file");
}

export const environmentConfig = Object.freeze({
  APP: {
    PORT: parseInt(<string>process.env.PORT, 10) || 3000,
    ENVIRONMENT: process.env.NODE_ENV,
  },
  DB: {
    CONNECTION_STRING: process.env.MONGODB_URI,
  },
  VEHICLE_API: {
    URL: process.env.VEHICLE_API_BASE_URL,
  }
});

export default environmentConfig;