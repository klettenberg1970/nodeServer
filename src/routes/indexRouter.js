
import { Router } from 'express';

import startRouter from './startRouter.js';


const router = Router();


router.use('/api/v1/start', startRouter);


export { router as indexRouter };