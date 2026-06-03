import { Router } from 'express';

import startRouter from './startRouter.js';
import rssRouter from './rssRouter.js';
import linksRouter from './linksRouter.js';
import kontakteRouter from './kontakteRouter.js';

const router = Router();

router.use('/api/v1/start', startRouter);
router.use('/api/v1/rss', rssRouter);
router.use('/api/v1/links', linksRouter);
router.use('/api/v1/kontakte', kontakteRouter);
export default router;