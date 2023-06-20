import { Router } from 'express';

import forum from './forum';

const router = Router();

router.use('/api/forum', forum);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.use('/*', (req, res, next) => next());

export default router;
