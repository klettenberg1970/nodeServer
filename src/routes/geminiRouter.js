
import express from 'express';

import {getGemini} from '../controllers/Gemini/geminiController.js'

const router = express.Router();


router.post('/',getGemini)


export default router;