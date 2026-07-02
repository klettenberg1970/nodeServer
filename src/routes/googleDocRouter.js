import express from 'express';

import { getDatei , changeDatei} from '../controllers/GoogleDoc/googleDocController.js';

const router = express.Router();


router.get('/:id', getDatei); 

router.put('/change/:id', changeDatei); 



export default router;