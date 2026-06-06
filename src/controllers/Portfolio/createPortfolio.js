import Portfolio from '../../models/portfoliomodel.js';
import crypto from 'node:crypto';

// Wir holen den Key aus der .env
const ENCRYPTION_KEY = process.env.PORTFOLIO_KEY; 
const IV_LENGTH = 16;

// Die Verschlüsselungs-Funktion direkt in der Datei
function encrypt(text) {
    // SICHERUNG: Prüfen, ob der Key existiert und die richtige Länge hat
    if (!ENCRYPTION_KEY) {
        throw new Error("Fehler: PORTFOLIO_KEY ist nicht in der .env definiert!");
    }
    if (ENCRYPTION_KEY.length !== 32) {
        throw new Error(`Fehler: PORTFOLIO_KEY muss 32 Zeichen haben, hat aber ${ENCRYPTION_KEY.length}!`);
    }

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY), iv);
    
    let encrypted = cipher.update(text, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    
    const authTag = cipher.getAuthTag();

    // Wir speichern IV, AuthTag und den verschlüsselten Text getrennt durch Doppelpunkte
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

export const createPortfolio = async (req, res) => {
    try {
        const { positions, cash } = req.body;

        // Validierung der Eingangsdaten
        if (!positions || !Array.isArray(positions)) {
            return res.status(400).json({ message: "Datenfehler: 'positions' muss ein Array sein!" });
        }

        // Mapping und Verschlüsselung
        const encryptedPositions = positions.map(pos => ({
            Name: pos.Name,
            Y_finance_code: pos.Y_finance_code || "TEMP",
            Anzahl: encrypt(pos.Anzahl.toString()),
            Einstandswert: encrypt(pos.Einstandswert.toString())
        }));

        const neuesPortfolio = new Portfolio({
            positions: encryptedPositions,
            cash: encrypt(cash.toString()),
           
        });

        await neuesPortfolio.save();

        res.status(201).json({ 
            message: "Portfolio erfolgreich mit AES-256 verschlüsselt!",
            id: neuesPortfolio._id 
        });

    } catch (error) {
        console.error("Controller Fehler:", error.message);
        res.status(500).json({ error: error.message });
    }
};