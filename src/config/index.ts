import {config} from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {NODE_ENV, PORT} = process.env;

//pg
export const {PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PW } = process.env;

//mongo
export const {MONGO_HOST, MONGO_PORT, MONGO_DATABASE, MONGO_USER, MONGO_PW} = process.env;