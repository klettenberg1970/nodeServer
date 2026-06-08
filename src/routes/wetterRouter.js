import express from 'express';
import {getWetter} from '../controllers/Wetter/wettercontroller.js';

const router = express.Router();

router.get('/', getWetter);

export default router;