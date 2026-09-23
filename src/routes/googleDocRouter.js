import express from 'express';

import { getDoc , changeDoc} from '../controllers/GoogleDoc/googleDocController.js';

const router = express.Router();


router.get('/:id', getDoc); 

router.put('/change/:id', changeDoc); 



export default router;