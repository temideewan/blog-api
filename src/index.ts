import express, { Express } from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes';
import initBlackListClient from './utils/database/redis-client';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());

app.use('/api', apiRouter);

const init = async () => {
  try {
    // connect to redis blacklist
    await initBlackListClient();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

init();
