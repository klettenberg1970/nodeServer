import { Router } from 'express';

import startRouter from './startRouter.js';
import rssRouter from './rssRouter.js';
import linksRouter from './linksRouter.js';
import kontakteRouter from './kontakteRouter.js';
import obsidianRouter from './obsidianRouter.js';
import fotoRouter from './fotoRouter.js';
import kursRouter from './kursRouter.js';
import portfolioRouter from './portfolioRouter.js';
import googleDocRouter from './googleDocRouter.js';
import wikipediaRouter from './wikipediaRouter.js';
import passwortRouter from './passwortRouter.js';
import passwoerterRouter from './passwoerterRouter.js'
import umfragenRouter from './umfragenRouter.js';
import geminiRouter from './geminiRouter.js';
import quizRouter from './quizRouter.js';

const router = Router();

router.use('/api/start', startRouter);


router.use('/api/v1/rss', rssRouter);



router.use('/api/v1/links', linksRouter);


router.use('/api/kontakte', kontakteRouter);
router.use('/api/v1/obsidian', obsidianRouter);
router.use('/api/obsidian', obsidianRouter);
router.use('/api/fotos', fotoRouter);


router.use('/api/v1/kurse', kursRouter);


router.use('/api/v1/portfolio', portfolioRouter);
router.use('/api/googledoc', googleDocRouter);
router.use('/api/umfragen', umfragenRouter);
router.use('/api/wikipedia', wikipediaRouter);
router.use('/api/passwort', passwortRouter);
router.use('/api/v1/passwoerter', passwoerterRouter);

router.use('/api/gemini', geminiRouter);
router.use('/api/quiz', quizRouter);


export default router;