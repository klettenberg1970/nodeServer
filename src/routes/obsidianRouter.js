import express from 'express';

import { getKompletteDateien ,getDateien,getDateibyId, getDateibyName,getOrdnerByID,getOrdnerByName, dateiAktualisierung } from '../controllers/Obsidian/obsidianController.js';
import { getOrdnerbyName } from '../controllers/Obsidian/getObsidian.js';

const router = express.Router();


router.get('/komplett/:id',getKompletteDateien)
router.get('/ordner/:id',getOrdnerByID)
router.get('/ordnername/:name',getOrdnerByName)

router.get('/dateien/:id', getDateien)  
router.get('/datei/:id', getDateibyId)  
router.get('/dateiname/:name', getDateibyName)

router.put ('/update', dateiAktualisierung)

export default router;