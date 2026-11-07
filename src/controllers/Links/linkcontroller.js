import Link from '../../models/linksmodel.js';
import { linkarray } from './linkarray.js';
import asyncHandler from '../../middleware/asyncHandler.js';
import { syncLinksZuMd } from './linkSync.js'; // NEU

export const getLinksSortiert = asyncHandler(async (req, res) => {
    const linkunsortiert = await Link.find();
    const links = linkarray(linkunsortiert);
    res.json(links);
});

export const getLinksUnsortiert = asyncHandler(async (req, res) => {
    const links = await Link.find();
    res.json({ links });
});

export const createLink = asyncHandler(async (req, res) => {
    const { category, name, url } = req.body;
    const link = await Link.create({ category, name, url });
    await syncLinksZuMd(); // NEU
    res.status(201).json(link);
});

export const deleteLink = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Link.findOneAndDelete({ _id: id });
    await syncLinksZuMd(); // NEU
    res.json('Erfolg');
});

export const deleteLinkOld = asyncHandler(async (req, res) => {
    const { name, url, category } = req.body;
    await Link.findOneAndDelete({ name, url, category });
    await syncLinksZuMd(); // NEU
    res.json('Erfolg');
});

export const deleteLinkByName = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    const filter = category ? { name, category } : { name };
    await Link.findOneAndDelete(filter);
    await syncLinksZuMd();
    res.json('Erfolg');
});

export const renameLinkbyName = asyncHandler(async (req, res) => {
    const { oldName, newName } = req.body;
    const updatedLink = await Link.findOneAndUpdate(
        { name: oldName },
        { name: newName },
        { new: true }
    );
    await syncLinksZuMd(); // NEU
    res.json(updatedLink);
});

export const moveLinkbyName = asyncHandler(async (req, res) => {
    const { name, oldCategory, newCategory } = req.body;
    const updatedLink = await Link.findOneAndUpdate(
        { name, category: oldCategory },
        { category: newCategory },
        { new: true }
    );
    await syncLinksZuMd(); // NEU
    res.json(updatedLink);
});
