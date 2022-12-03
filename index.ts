import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';
import bodyParser from 'body-parser';

dotenv.config({
    path: resolve(__dirname, '../.env'),
});

import { db } from './db';

const app: Express = express();
const port = process.env.PORT;

db.connect();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req: Request, res: Response) => {
    res.send('App is currently running');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
