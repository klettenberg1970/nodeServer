
import Notizen from '../../models/notizenModel.js';
import asyncHandler from '../../middleware/asyncHandler.js';

export const getNotizen = asyncHandler(async (req, res) => {
    const daten = await Notizen.find();
    res.json({ daten });
});

export const createNotizen = asyncHandler(async (req, res) => {
    const daten = await Notizen.create(req.body);
    res.status(201).json({ daten });
});

export const deleteNotizen = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const daten = await Notizen.findByIdAndDelete(id);
    res.json({ daten });
});
