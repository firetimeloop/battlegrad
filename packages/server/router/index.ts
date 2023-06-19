import { Router } from 'express';

import forum from './forum';

const router = Router();

router.use('/forum', forum);

router.use('/*', (req, res) =>
  res
    .status(400)
    .json({ requestMethod: req.method, message: 'Путь не найден' }),
);

export default router;
