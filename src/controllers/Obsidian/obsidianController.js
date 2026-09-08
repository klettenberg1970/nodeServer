import asyncHandler from '../../middleware/asyncHandler.js';
import { getOrdnerbyName, dateien, getDateiByID, getDateiByName, getOrdnerbyID} from "./getObsidian.js";
import {aktualisiereDatei} from './editObsidian.js'
import{ kompletteDateien} from "./kompletteDateien.js"



export const getKompletteDateien = asyncHandler(async (req,res) =>{
  const folderId = req.params.id;
  const result = await kompletteDateien(folderId);
    res.json(result);
})

export const getDateien = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const mdDateien = await dateien(id);
  res.json({ mdDateien: mdDateien });
});

export const getDateibyId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const singleDatei = await getDateiByID(id);
  res.json({ singleDatei: singleDatei });
});

export const getDateibyName = asyncHandler(async (req, res) => {
  const name = req.params.name;
  const datei = await getDateiByName(name);
  res.json({ datei: datei });
});


export const getOrdnerByID = asyncHandler( async (req,res) =>{
   const id = req.params.id;
   
   const ordner = await getOrdnerbyID (id);
   
   res.json({ ordner: ordner });
})

export const getOrdnerByName = asyncHandler( async (req,res) =>{
   const name = req.params.name;
  
   const ordner = await getOrdnerbyName (name);
   
   res.json({ ordner: ordner });
})



export const dateiAktualisierung =  asyncHandler( async (req,res) =>{
  const {text, id} = req.body;
  await aktualisiereDatei(id,text)
  res.json({message:'gespeichert'})
})