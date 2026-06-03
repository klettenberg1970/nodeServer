import Kontakte from '../../models/kontaktemodel.js';
import asyncHandler from '../../middleware/asyncHandler.js';

export const createKontakt = asyncHandler(async (req, res) => {
    const {
        id,
        kategorie,
        vorname,
        nachname,
        strasse,
        hausnummer,
        postleitzahl,
        wohnort,
        geburtstag,
        geburtsjahr,
        herkunft,
        telefonnummer,
        email,
        interessen,
        bemerkungen
    } = req.body;

    await Kontakte.create({
        id,
        kategorie,
        vorname,
        nachname,
        strasse,
        hausnummer,
        postleitzahl,
        wohnort,
        geburtstag,
        geburtsjahr,
        herkunft,
        telefonnummer,
        email,
        interessen,
        bemerkungen
    });

    res.json("Erfolg");
});