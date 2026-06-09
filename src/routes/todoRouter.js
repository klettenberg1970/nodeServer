import express from 'express';

import { getTodoDatei , changeTodoDatei} from '../controllers/Todo/todoController.js';

const router = express.Router();


router.get('/', getTodoDatei); 

router.put('/change', changeTodoDatei); 



export default router;