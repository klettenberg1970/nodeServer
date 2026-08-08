import express from 'express';
import { getnamen,getfeeds ,createFeeds, deleterss, getAllFeeds} from '../controllers/RSS/rssController.js';

const router = express.Router();


router.get('/namen', getnamen);
router.post('/ausgeben', getfeeds);
router.post('/create', createFeeds);
router.delete('/delete/:id',deleterss)
router.get('/getalledaten', getAllFeeds)


export default router;