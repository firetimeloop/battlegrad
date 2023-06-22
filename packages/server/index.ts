import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { dbConnect } from './db';
import router from './router/index';

dotenv.config();

const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3001;

dbConnect();

app.use(router);

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
