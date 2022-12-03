import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';
import bodyParser from 'body-parser';

dotenv.config({
    path: resolve(__dirname, '../.env'),
});

import { syncModels } from './db';

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

(async () => {
    await syncModels({ force: true });
    app.get('/', (req: Request, res: Response) => {
        res.send('App is currently running');
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})();
