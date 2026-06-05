import { Router } from 'express';

import startRouter from './startRouter.js';
import rssRouter from './rssRouter.js';
import linksRouter from './linksRouter.js';
import kontakteRouter from './kontakteRouter.js';
import obsidianRouter from './obsidianRouter.js';
import fotoRouter from './fotoRouter.js';

const router = Router();

router.use('/api/v1/start', startRouter);
router.use('/api/v1/rss', rssRouter);
router.use('/api/v1/links', linksRouter);
router.use('/api/v1/kontakte', kontakteRouter);
router.use('/api/v1/obsidian', obsidianRouter);
router.use('/api/v1/fotos', fotoRouter);


export default router;