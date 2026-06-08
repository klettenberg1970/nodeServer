import 'dotenv/config'; 
import jwt from 'jsonwebtoken';

export const checkPasswort = (req, res) => {
    const { password } = req.body; // Destructuring ist sauberer
    const correctPassword = process.env.PORTFOLIO_PASSWORD;
    const JWT_SECRET = process.env.JWT_SECRET;
    

    if (password === correctPassword) {
        // Token erstellen
        const token = jwt.sign(
            { user: 'admin' }, 
            JWT_SECRET, 
            { expiresIn: '5m' }
        );

        // Token an das Frontend senden
        return res.json({ message: true, token: token });
    } else {
        return res.json({ message: false, message: 'Falsches Passwort' });
    }
};