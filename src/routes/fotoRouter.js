import express from 'express';
import { getOrdner,getFotos,deleteFoto,moveFoto } from '../controllers/Fotos/fotoController.js';


const router = express.Router();


router.get('/ordner', getOrdner);
router.get('/fotosholen/:id', getFotos);
router.post('/delete',deleteFoto);
router.post('/move',moveFoto)

export default router;