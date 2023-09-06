import express, { Express, Response, Request } from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';

import { sequelize } from './util/database';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(morgan('tiny'));

app.use('/', (req: Request, res: Response) => {
  console.log('Index');
  return res.status(200).send('Hello');
});

const port = process.env.PORT;

sequelize
  .sync()
  .then(() => {
    console.log('DB connected');
    app.listen(port, () => {
      console.log(`The server is running on port " ${port}"`);
    });
  })
  .catch(() => {
    console.log('DB connection failed');
  });
