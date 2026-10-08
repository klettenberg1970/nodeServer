import express from 'express';

import { getDoc , changeDoc, createGoogleDoc} from '../controllers/GoogleDoc/googleDocController.js';

const router = express.Router();


router.get('/:id', getDoc); 

router.put('/change/:id', changeDoc); 

router.post('/create', createGoogleDoc);



export default router;