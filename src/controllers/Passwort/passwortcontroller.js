import 'dotenv/config';
import jwt from 'jsonwebtoken';
import asyncHandler from '../../middleware/asyncHandler.js';

export const checkPasswort = asyncHandler((req, res) => {
    const { password } = req.body;
    const correctPassword = process.env.PASSWORD;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (password === correctPassword) {
        const token = jwt.sign(
            { user: 'admin' },
            JWT_SECRET,
            { expiresIn: '5m' }
        );
        return res.json({ message: true, token: token });
    } else {
        return res.json({ message: false });
    }
})

// Neue Funktion für die Verify-Route
export const verifyTokenStatus = asyncHandler((req, res) => {
    res.json({ message: true, user: req.user });
});