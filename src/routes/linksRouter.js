import express from 'express';
import { getLinksSortiert, createLink, deleteLink ,getLinksUnsortiert,deleteLinkOld,deleteLinkByName,renameLinkbyName, moveLinkbyName } from '../controllers/Links/linkcontroller.js';

const router = express.Router();

router.get('/', getLinksSortiert); 
router.get('/getalledaten', getLinksUnsortiert);

router.post('/create', createLink); 

router.post('/deleteold', deleteLinkOld); 
router.delete('/delete/:id', deleteLink); 
router.post('/deletebyname', deleteLinkByName); 

router.post('/rename', renameLinkbyName);
router.post('/move', moveLinkbyName); 


export default router;


