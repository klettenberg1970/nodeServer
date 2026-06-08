import express from 'express';
import {createNewUser,getTodo,createNewTodo, deleteTodo, checkLoggin} from '../controllers/Todo/todoController.js';

const router = express.Router();


router.post('/create', createNewUser);
router.post('/loggin',checkLoggin)

router.get('/:username', getTodo)
router.post('/new/:username', createNewTodo);
router.delete('/delete/:username',deleteTodo);



export default router;