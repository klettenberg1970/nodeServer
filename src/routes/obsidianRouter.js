import express from 'express';

import { getStartDatei,getObsidianOrdner,getDateien,getDateibyId, getDateibyName,getOrdnerByID} from '../controllers/Obsidian/obsidianController.js';

const router = express.Router();


router.get('/',getStartDatei)
router.get('/obsidianordner',getObsidianOrdner)
router.get('/ordner/:id',getOrdnerByID)
router.get('/dateien/:id', getDateien)  
router.get('/datei/:id', getDateibyId)  
router.get('/dateiname/:name', getDateibyName)

export default router;