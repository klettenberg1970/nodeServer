import asyncHandler from '../../middleware/asyncHandler.js';
import {dateiLesen, dateiSchreiben} from './toDoDoc.js';

const TODOID = '1LotmSZ37UUnLDGcOXpKEGTwoBtJDk0C1wIqB1VayEVc'

export const getTodoDatei = asyncHandler(async (req,res) =>{
     const toDoId = process.env.TODOID || TODOID;  
     
     if (!toDoId) {
         return res.status(500).json({ error: 'TODOID ist nicht definiert' });
     }
     
     const inhalt = await dateiLesen(toDoId);
     res.json({ inhalt });
})

export const changeTodoDatei = asyncHandler(async (req,res) =>{
     const toDoId = process.env.TODOID || TODOID;  
     const text = req.body.text;
     
     if (!toDoId) {
         return res.status(500).json({ error: 'TODOID ist nicht definiert' });
     }
     
     await dateiSchreiben(toDoId, text);
     res.json({ message:'hat geklappt' });
})