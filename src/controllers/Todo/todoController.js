
import asyncHandler from '../../middleware/asyncHandler.js';
import {dateiLesen, dateiSchreiben} from './toDoDoc.js';

const toDoId = '1LotmSZ37UUnLDGcOXpKEGTwoBtJDk0C1wIqB1VayEVc';

export const getTodoDatei = asyncHandler(async (req,res) =>{
     const inhalt = await dateiLesen(toDoId);
     res.json({ inhalt });
})

// export const changeTodoDatei = asyncHandler(async (req,res) =>{
//      const inhalt = await dateiLesen(toDoId);
//      res.json({ inhalt });

// })