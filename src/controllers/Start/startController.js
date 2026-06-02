import asyncHandler from '../../middleware/asyncHandler.js';

export const getStart = asyncHandler(async (req, res) => {
    const start = " Das ist die Startseite , nur zum Testen";
    res.json({ start });
});