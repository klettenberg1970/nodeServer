import Kontakte from '../../models/kontaktemodel.js';
import asyncHandler from '../../middleware/asyncHandler.js';

export const getKontakte = asyncHandler(async (req, res) => {
    const kontakte = await Kontakte.find();
    res.json({ kontakte });
});

export const getNextId = asyncHandler(async (req, res) => {
    const kontakteCount = await Kontakte.countDocuments();
    const neueId = kontakteCount + 1;
    res.json({ neueId });
});

export const getKontaktById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const kontakt = await Kontakte.findOne({ id: id });
    res.json(kontakt);
});

export const updateKontakt = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    const updatedKontakt = await Kontakte.findOneAndUpdate(
        { id: id },
        updateData,
        { new: true }
    );

    if (!updatedKontakt) {
        return res.status(404).json({ message: "Kontakt nicht gefunden" });
    }

    res.json('Erfolg');
});

export const deleteKontakt = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Kontakte.findOneAndDelete({ id: id });
    res.json('Erfolg');
});