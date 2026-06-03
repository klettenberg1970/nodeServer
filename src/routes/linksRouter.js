import express from 'express';
import { getLinks, createLink, deleteLink } from '../controllers/Links/linkcontroller.js';

const router = express.Router();

router.get('/', getLinks);    
router.post('/add', createLink); 
router.post('/delete', deleteLink); 

export default router;
