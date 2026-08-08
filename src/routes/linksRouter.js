import express from 'express';
import { getLinks, createLink, deleteLink ,getLinksUnsortiert,deleteLinkOld} from '../controllers/Links/linkcontroller.js';

const router = express.Router();

router.get('/', getLinks);    
router.post('/create', createLink); 
router.post('/deleteold', deleteLinkOld); 

router.delete('/delete/:id', deleteLink); 
router.get('/getalledaten', getLinksUnsortiert)

export default router;


