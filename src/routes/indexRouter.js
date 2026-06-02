import { Router } from 'express';

import startRouter from './startRouter.js';
import rssRouter from './rssRouter.js';

const router = Router();

router.use('/api/v1/start', startRouter);
router.use('/api/v1/rss', rssRouter);

export default router;