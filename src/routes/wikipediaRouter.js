import express from 'express';
import { getSummary } from '../controllers/Wikipedia/wikipediaController.js';

const router = express.Router();

router.get('/', getSummary);


export default router;