import express from 'express';
import { getLinks, createLink, deleteLink ,getLinksUnsortiert} from '../controllers/Links/linkcontroller.js';

const router = express.Router();

router.get('/', getLinks);    
router.post('/add', createLink); 
router.post('/delete', deleteLink); 


router.get('/getalledaten', getLinksUnsortiert)

export default router;
