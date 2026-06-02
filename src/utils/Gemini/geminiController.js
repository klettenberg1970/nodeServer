import { getMessage } from './gemini.js';

export const getGemini = async (req, res) => {
    const { prompt, password } = req.body;
    const correctPassword = process.env.PORTFOLIO_PASSWORD;

    if (password === correctPassword) {
        try {
            const message = await getMessage(prompt);
            res.json({ result: message });
        } catch (error) {
            res.status(500).json({ error: 'Fehler bei der KI-Anfrage' });
        }
    } else {
        res.status(401).json({ error: 'Keine Berechtigung!' });
    }
};