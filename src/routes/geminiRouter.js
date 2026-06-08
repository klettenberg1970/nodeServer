
import express from 'express';

import {getGemini} from '../utils/Gemini/geminiController.js'

const router = express.Router();


router.post('/',getGemini)


export default router;