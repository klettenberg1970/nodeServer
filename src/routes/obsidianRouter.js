import express from 'express';
import multer from 'multer';

import { getKompletteDateien ,getDateien,getDateibyId, getDateibyName,getOrdnerByID,getOrdnerByName, dateiAktualisierung, createNeueDatei  } from '../controllers/Obsidian/obsidianController.js';
import { speichernFile } from '../controllers/Obsidian/filetransferController.js';
import { getOrdnerbyName } from '../controllers/Obsidian/getObsidian.js';

const router = express.Router();


router.get('/komplett/:id',getKompletteDateien)
router.get('/ordner/:id',getOrdnerByID)
router.get('/ordnername/:name',getOrdnerByName)

router.get('/dateien/:id', getDateien)  
router.get('/datei/:id', getDateibyId)  
router.get('/dateiname/:name', getDateibyName)

router.put ('/update', dateiAktualisierung);

router.post('/create', createNeueDatei);


const upload = multer({ storage: multer.memoryStorage() });

router.post('/speichern', upload.single('datei'), speichernFile);

export default router;