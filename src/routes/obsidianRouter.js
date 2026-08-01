import express from 'express';

import { getStartDatei,getKompletteDateien ,getDateien,getDateibyId, getDateibyName,getOrdnerByID, dateiAktualisierung } from '../controllers/Obsidian/obsidianController.js';

const router = express.Router();


router.get('/',getStartDatei)
router.get('/komplett/:id',getKompletteDateien)
router.get('/ordner/:id',getOrdnerByID)
router.get('/dateien/:id', getDateien)  
router.get('/datei/:id', getDateibyId)  
router.get('/dateiname/:name', getDateibyName)

router.put ('/update', dateiAktualisierung)

export default router;