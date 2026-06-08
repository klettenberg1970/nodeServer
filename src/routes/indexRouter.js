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
import wetterRouter from './wetterRouter.js';
import umfragenRouter from './umfragenRouter.js';
import wikipediaRouter from './wikipediaRouter.js';
import passwortRouter from './passwortRouter.js';
import geminiRouter from './geminiRouter.js';

const router = Router();

router.use('/api/v1/start', startRouter);
router.use('/api/v1/rss', rssRouter);
router.use('/api/v1/links', linksRouter);
router.use('/api/v1/kontakte', kontakteRouter);
router.use('/api/v1/obsidian', obsidianRouter);
router.use('/api/v1/fotos', fotoRouter);
router.use('/api/v1/kurse', kursRouter);
router.use('/api/v1/portfolio', portfolioRouter);

router.use('/api/v1/todo', todoRouter);
router.use('/api/v1/wetter', wetterRouter);
router.use('/api/v1/wikipedia', wikipediaRouter);
router.use('/api/v1/umfragen', umfragenRouter);
router.use('/api/v1/passwort', passwortRouter);
router.use('/api/v1/gemini', geminiRouter);


export default router;