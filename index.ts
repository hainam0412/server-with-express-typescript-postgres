import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({
    path: resolve(__dirname, '../.env'),
});

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('App is currently running');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
