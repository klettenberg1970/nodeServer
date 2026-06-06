import express from 'express';
import { getPortfolio, editPortfolio, createPortfolio, getPortfolioDaten } from '../controllers/Portfolio/portfolioController.js';

const router = express.Router();

router.get('/', getPortfolio);           // ← OHNE asyncHandler
router.post('/create', createPortfolio); // ← OHNE asyncHandler
router.post('/edit', editPortfolio);     // ← OHNE asyncHandler
router.get('/daten', getPortfolioDaten);

export default router;