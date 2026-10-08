import asyncHandler from '../../middleware/asyncHandler.js';
import {dateiLesen, dateiSchreiben, docErstellen} from './googleDoc.js';


export const getDoc = asyncHandler(async (req,res) =>{
     
     const Id = req.params.id; 
     const inhalt = await dateiLesen(Id);
     res.json({ inhalt });
})

export const changeDoc = asyncHandler(async (req,res) =>{
    const ID = req.params.id
     const text = req.body.text;
  
     await dateiSchreiben(ID, text);
     res.json({ message:'hat geklappt' });
})

export const createGoogleDoc = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'name fehlt' });
  }

  const doc = await docErstellen(name);
  res.status(201).json({ success: true, id: doc.id, name: doc.name, link: doc.webViewLink });
});