import asyncHandler from '../../middleware/asyncHandler.js';
import { fotoOrdner } from './fotoordner.js'
import { getFotosVonOrdner } from './fotoGetter.js'
import { loescheFoto, verschiebeFoto } from './fotoEdit.js';

export const getOrdner = asyncHandler(async (req, res) => {
  const ordnerBaum = await fotoOrdner();
  res.json({ ordner: ordnerBaum });
});

export const getFotos = asyncHandler(async (req, res) => {
  const fotos = await getFotosVonOrdner(req.params.id);
  res.json({ fotos });
});

export const deleteFoto = asyncHandler(async (req, res) => {
  const { id } = req.body;
  await loescheFoto(id);
  res.json({ message: 'Erfolg' });
});

export const moveFoto = asyncHandler(async (req, res) => {
  const { id, zielOrdner } = req.body;
  await verschiebeFoto(id, zielOrdner);
  res.json({ message: 'Erfolg' });
});