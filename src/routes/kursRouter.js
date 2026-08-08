import express from 'express';
import { createAsset, getkurse, deleteAsset, getCharts, getAssets } from '../controllers/Kurse/kurscontroller.js';

const router = express.Router();

router.get('/', getkurse);
router.post('/charts', getCharts);
router.post('/create', createAsset);
router.delete('/delete/:id', deleteAsset);
router.get('/getalledaten', getAssets)
export default router;