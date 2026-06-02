import jwt from 'jsonwebtoken'; // Diese Zeile fehlt!

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ message: "Kein Zutritt: Kein Token vorhanden" });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Sitzung abgelaufen. Bitte neu einloggen." });
        }
        
        req.user = decoded;
        next();
    });
};