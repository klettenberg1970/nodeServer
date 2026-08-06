import express from 'express';
import { getnamen,getfeeds ,createFeeds, deleterss, getAllFeeds} from '../controllers/RSS/rssController.js';

const router = express.Router();


router.get('/namen', getnamen);
router.get('/all',  getAllFeeds);
router.post('/ausgeben', getfeeds);
router.post('/add', createFeeds);
router.delete('/delete',deleterss)


router.get('/getalledaten', getAllFeeds)


export default router;