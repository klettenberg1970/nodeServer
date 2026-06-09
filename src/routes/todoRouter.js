import express from 'express';

import { getTodoDatei } from '../controllers/Todo/todoController.js';

const router = express.Router();


router.get('/', getTodoDatei);   



export default router;