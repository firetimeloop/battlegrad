import cors from 'cors';

const whitelist = ['http://localhost:3000', 'http://62.84.121.9:3000'];

const corsOptions = {
  origin: whitelist,
  credentials: true,
};

export default cors(corsOptions);
