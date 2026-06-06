import express from 'express';
import { createAsset, getkurse, deleteAsset, getCharts, getAssets } from '../controllers/Kurse/kurscontroller.js';

const router = express.Router();

router.get('/', getkurse);
router.get('/assets', getAssets);
router.post('/add', createAsset);
router.post('/delete', deleteAsset);
router.post('/charts', getCharts);

export default router;