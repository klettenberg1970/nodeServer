
import express from 'express';

import { getNotizen, createNotizen, deleteNotizen } from '../controllers/Notizen/notizenController.js';

const router = express.Router();

router.get('/', getNotizen);
router.post('/create', createNotizen);
router.delete('/:id', deleteNotizen);

export default router;