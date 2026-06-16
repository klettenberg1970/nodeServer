import { Router } from 'express';

import startRouter from './startRouter.js';
import rssRouter from './rssRouter.js';
import linksRouter from './linksRouter.js';
import kontakteRouter from './kontakteRouter.js';
import obsidianRouter from './obsidianRouter.js';
import fotoRouter from './fotoRouter.js';
import kursRouter from './kursRouter.js';
import portfolioRouter from './portfolioRouter.js';

import todoRouter from './todoRouter.js';
import wikipediaRouter from './wikipediaRouter.js';
import passwortRouter from './passwortRouter.js';
import umfragenRouter from './umfragenRouter.js';
import geminiRouter from './geminiRouter.js';

const router = Router();

router.use('/api/start', startRouter);
router.use('/api/rss', rssRouter);
router.use('/api/links', linksRouter);
router.use('/api/kontakte', kontakteRouter);
router.use('/api/obsidian', obsidianRouter);
router.use('/api/fotos', fotoRouter);
router.use('/api/kurse', kursRouter);
router.use('/api/portfolio', portfolioRouter);

router.use('/api/todo', todoRouter);
router.use('/api/umfragen', umfragenRouter);
router.use('/api/wikipedia', wikipediaRouter);
router.use('/api/passwort', passwortRouter);
router.use('/api/gemini', geminiRouter);


export default router;