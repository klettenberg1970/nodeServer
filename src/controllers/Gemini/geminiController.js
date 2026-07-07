import { getMessage } from './gemini.js';
import asyncHandler from '../../middleware/asyncHandler.js';

export const getGemini =asyncHandler( async (req, res) => {
    const { prompt } = req.body;
    console.log(prompt)
    
    const data = await getMessage(prompt);
    // Im Controller direkt nach dem await getMessage(prompt);
console.log("Details der API-Antwort:", data);
    res.json({ 
        result: data.text,
        metadata: {
            tokens: data.usage,
            model: data.model
        }
    });
})