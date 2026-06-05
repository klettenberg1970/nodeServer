import express from 'express';

import { getStartDatei,getProjekteOrdner,getDateien,getDateibyId, getDateibyName} from '../controllers/Obsidian/obsidianController.js';

const router = express.Router();


router.get('/',getStartDatei)
router.get('/alleordner',getProjekteOrdner)
router.get('/dateien/:id', getDateien)  
router.get('/datei/:id', getDateibyId)  
router.get('/dateiname/:name', getDateibyName)

export default router;