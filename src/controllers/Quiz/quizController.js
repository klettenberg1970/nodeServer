import Quiz from '../../models/quizModel.js';
import asyncHandler from '../../middleware/asyncHandler.js';





export const getQuizFragen = asyncHandler(async (req, res) => {
    const fragen = await Quiz.find();
 
        res.json(fragen);
});



export const createQuizfragen = asyncHandler(async (req, res) => {
    const { id, thema, unterthema, schwierigkeit, tags, frage, antwort, optionen, erklaertext } = req.body;
    
    await Quiz.create({
        id,
        thema,
        unterthema,
        schwierigkeit,
        tags,
        frage,
        antwort,
        optionen,
        erklaertext
    });
    
    res.status(201).json({ success: true });
});