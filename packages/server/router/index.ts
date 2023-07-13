import { Router } from 'express';
import { checkAuthorization } from '../middlewares/checkAuthorization';

import forum from './forum';
import theme from './theme';

const router = Router();

router.use('/api/theme', theme);
router.use(
  '/api/forum',
  (req, res, next) => checkAuthorization(req, res, next),
  forum,
);

router.use('/api/forum/*', (req, res) =>
  res
    .status(400)
    .json({ requestMethod: req.method, message: 'Путь не найден' }),
);

router.use('/api/theme/*', (req, res) =>
  res
    .status(400)
    .json({ requestMethod: req.method, message: 'Путь не найден' }),
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.use('/*', (req, res, next) => next());

export default router;
