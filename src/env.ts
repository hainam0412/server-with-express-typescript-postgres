import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({
    path: resolve(__dirname, '../.env'),
});

export const ENV_VAR = Object.freeze({
    PORT: Number(process.env.PORT as string),
    DB: process.env.DB as string,
    ENV: process.env.ENV as string,
});
