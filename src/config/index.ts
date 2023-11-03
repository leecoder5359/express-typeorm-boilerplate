import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { NODE_ENV, PORT, COOKIE_ENCRYPTION_KEY } = process.env;

//pg
export const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PW } = process.env;

//mongo
export const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE, MONGO_USER, MONGO_PW } = process.env;

//google
export const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_PASSWORD, GOOGLE_EMAIL, GOOGLE_EMAIL_PASSWORD } = process.env;

//kakao
export const { KAKAO_API_KEY } = process.env;