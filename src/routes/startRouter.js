
import { Router } from 'express';


import { getStart } from '../controllers/Start/startController.js';


const router = Router();

router.get('/', getStart);  

export default router;

