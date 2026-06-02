import express from 'express';
import { getnamen,getfeeds ,postfeeds, deleterss, getAllFeeds} from '../controllers/RSS/rssController.js';

const router = express.Router();


router.get('/namen', getnamen);
router.get('/all',  getAllFeeds);



router.post('/ausgeben', getfeeds);
router.post('/add', postfeeds);

router.delete('/delete',deleterss)


export default router;