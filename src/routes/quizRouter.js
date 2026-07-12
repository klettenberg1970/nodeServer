
import express from 'express';

import{getQuizFragen,createQuizfragen } from '../controllers/Quiz/quizController.js'

const router = express.Router();



router.get('/',getQuizFragen)

router.post('/create',createQuizfragen )

export default router;