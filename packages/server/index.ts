import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

dotenv.config();

// Тут оно, наверное, в require компилируется и поэтому такой порядок, пока заигнорю
// eslint-disable-next-line import/first
import { dbConnect } from './db';

const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3001;

dbConnect();

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
