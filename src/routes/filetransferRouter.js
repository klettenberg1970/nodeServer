import express from 'express';
import multer from 'multer';

import { speichernFile } from '../controllers/Filetransfer/filetransferController.js';

const router = express.Router();

// Dateien landen im Speicher (req.file.buffer) statt auf der Platte,
// damit wir den Inhalt direkt weiterverarbeiten können.
const upload = multer({ storage: multer.memoryStorage() });

router.post('/speichern', upload.single('datei'), speichernFile);

export default router;