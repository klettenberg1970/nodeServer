import express from 'express';
import { createKontakt } from '../controllers/Kontakte/kontaktCreateController.js';
import { getKontakte, getNextId ,getKontaktById, updateKontakt, deleteKontakt} from '../controllers/Kontakte/kontakteGetController.js';

const router = express.Router();

// Spezifische Routes zuerst
router.get('/next-id', getNextId);  
router.get('/', getKontakte);   
router.get('/:id', getKontaktById);    
router.post('/create', createKontakt);
router.put('/:id', updateKontakt);         
router.delete('/:id', deleteKontakt)

export default router;