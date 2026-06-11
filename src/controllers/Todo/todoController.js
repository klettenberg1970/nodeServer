import asyncHandler from '../../middleware/asyncHandler.js';
import {dateiLesen, dateiSchreiben} from './toDoDoc.js';

// NICHT hier oben auslesen!
// const toDoId = process.env.TODOID;  // ← Das ist das Problem!

export const getTodoDatei = asyncHandler(async (req,res) =>{
     const toDoId = process.env.TODOID;  // ← Hier zur Laufzeit lesen!
     
     if (!toDoId) {
         return res.status(500).json({ error: 'TODOID ist nicht definiert' });
     }
     
     const inhalt = await dateiLesen(toDoId);
     
     res.json({ inhalt });
})

export const changeTodoDatei = asyncHandler(async (req,res) =>{
     const toDoId = process.env.TODOID;  // ← Auch hier zur Laufzeit!
     const text = req.body.text;
     
     if (!toDoId) {
         return res.status(500).json({ error: 'TODOID ist nicht definiert' });
     }
     
     await dateiSchreiben(toDoId, text);
     res.json({ message:'hat geklappt' });
})