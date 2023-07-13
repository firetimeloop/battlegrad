import cors from 'cors';

const whitelist = ['http://localhost:3000'];

const corsOptions = {
  origin: whitelist,
  credentials: true,
};

export default cors(corsOptions);
