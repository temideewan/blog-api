import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
