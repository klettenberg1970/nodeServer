import Link from '../../models/linksmodel.js';
import { linkarray } from './linkarray.js';
import asyncHandler from '../../middleware/asyncHandler.js';

export const getLinks = asyncHandler(async (req, res) => {
    const linkunsortiert = await Link.find();
    const links = linkarray(linkunsortiert);
    res.json(links);
});

export const createLink = asyncHandler(async (req, res) => {
    const { category, name, url } = req.body;
    const link = await Link.create({ category, name, url });
    res.status(201).json(link);
});

export const deleteLink = asyncHandler(async (req, res) => {
    const { category, name, url } = req.body;

    const geloeschterLink = await Link.findOneAndDelete({ category, name, url });

    if (!geloeschterLink) {
        return res.status(404).json({ message: "Link nicht gefunden" });
    }

    res.status(200).json({
        success: true,
        message: "Link erfolgreich gelöscht",
        geloeschterLink
    });
});