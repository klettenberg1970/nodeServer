import express from 'express';
import { getPortfolio, editPortfolio, createPortfolio, getPortfolioDaten,updateCash } from '../controllers/Portfolio/portfolioController.js';

const router = express.Router();

router.get('/', getPortfolio);           
router.post('/create', createPortfolio); 
router.post('/edit', editPortfolio);     
router.get('/daten', getPortfolioDaten);
router.put('/cash', updateCash);

export default router;