import asyncHandler from '../../middleware/asyncHandler.js';
import {dateiLesen, dateiSchreiben} from './googleDoc.js';


export const getDatei = asyncHandler(async (req,res) =>{
     
     const Id = req.params.id; 
     const inhalt = await dateiLesen(Id);
     res.json({ inhalt });
})

export const changeDatei = asyncHandler(async (req,res) =>{
    const ID = req.params.id
     const text = req.body.text;
  
     await dateiSchreiben(ID, text);
     res.json({ message:'hat geklappt' });
})