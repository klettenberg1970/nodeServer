import express from 'express';
import{getPasswoerter,createPasswort,deletePasswort  } from '../controllers/Passwort/passwoerterController.js'

const router = express.Router();

router.get('/', getPasswoerter); 
router.post('/create',createPasswort );
router.delete('/delete/:id', deletePasswort); 


export default router;