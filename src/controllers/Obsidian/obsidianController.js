import asyncHandler from '../../middleware/asyncHandler.js';
import { startDatei, projekteOrdner, dateien, getDateiByID, getDateiByName } from "./obsidian.js";

export const getStartDatei = asyncHandler(async (req, res) => {
  const start = await startDatei();
  res.json({ start: start });
});

export const getProjekteOrdner = asyncHandler(async (req, res) => {
  const alleOrdner = await projekteOrdner();
  res.json({ alleOrdner: alleOrdner });
});

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