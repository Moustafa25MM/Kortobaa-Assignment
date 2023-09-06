import express, { Express, Response, Request } from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';

import { sequelize } from './util/database';
import { indexRouter } from './routes';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(morgan('tiny'));

app.use(indexRouter);

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
