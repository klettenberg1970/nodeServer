import asyncHandler from '../../middleware/asyncHandler.js';
import { startDatei, obsidianOrdner, dateien, getDateiByID, getDateiByName, getOrdnerbyID} from "./obsidian.js";
import{ kompletteDateien} from "./kompletteDateien.js"

export const getStartDatei = asyncHandler(async (req, res) => {
  const start = await startDatei();
  res.json({ start: start });
});

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
   console.log(id)
   const ordner = await getOrdnerbyID (id);
   console.log(ordner)
   res.json({ ordner: ordner });
})