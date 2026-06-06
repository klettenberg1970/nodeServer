import Portfolio from '../../models/portfoliomodel.js';
import { getDaten } from './getDaten.js';
import { update } from './editPortfolio.js';
import Portfoliodaten from './portfolioDaten.js';
import asyncHandler from '../../middleware/asyncHandler.js';

// Einfache Route: Gibt alle Portfolio-Dokumente zurück (Rohdaten)
export const getPortfolioDaten = asyncHandler(async (req, res) => {
    const portfolio = await Portfolio.find();
    res.json({ portfolio });
});

// Hauptroute: Entschlüsselt und berechnet die Kurse
export const getPortfolio = asyncHandler(async (req, res) => {
    // 1. Das verschlüsselte Dokument aus der DB holen
    const doc = await Portfolio.findOne().sort({ createdAt: -1 });
    
    if (!doc) {
        return res.status(404).json({ error: 'Kein Portfolio gefunden' });
    }
    
    // 2. Entschlüsseln (Rohdaten: Anzahl, Einstandswert als Zahlen)
    const rohDaten = getDaten(doc);

    // 3. Prüfen, ob nur die Rohdaten gewünscht sind
    if (req.query.rohdaten === 'true') {
        // Nur Rohdaten zurückgeben (für dein Skript)
        return res.json(rohDaten);
    }

    // 4. Berechnen (Kurse holen, Summen bilden) - nur für normalen Aufruf
    const finaleDaten = await Portfoliodaten(rohDaten);
    
    // 5. Normale Antwort ans Frontend
    res.json(finaleDaten);
});

// Portfolio bearbeiten (eine Position aktualisieren)
export const editPortfolio = asyncHandler(async (req, res) => {
    const { name, anzahl, einstand } = req.body;
    const key = process.env.PORTFOLIO_KEY;

    if (!name || anzahl === undefined || einstand === undefined) {
        return res.status(400).json({ 
            error: 'Name, Anzahl und Einstand sind erforderlich' 
        });
    }

    // 1. Das neueste Portfolio-Dokument finden
    const portfolioDoc = await Portfolio.findOne().sort({ createdAt: -1 });

    if (!portfolioDoc) {
        return res.status(404).json({ error: 'Kein Portfolio gefunden' });
    }

    // 2. Die Aktie im positions-Array suchen
    const position = portfolioDoc.positions.find(p => p.Name === name);

    if (!position) {
        return res.status(404).json({ error: `Position "${name}" nicht gefunden` });
    }

    // 3. Die Werte mit deiner neuen Funktion "updaten" (verschlüsseln)
    position.Anzahl = update(anzahl, key);
    position.Einstandswert = update(einstand, key);

    // 4. In der Datenbank speichern
    await portfolioDoc.save();

    console.log(`✅ Portfolio aktualisiert:`);
    console.log(`   Name: ${name}`);
    console.log(`   Anzahl (verschlüsselt): ${anzahl}`);
    console.log(`   Einstand (verschlüsselt): ${einstand}`);

    res.json({ 
        message: 'Portfolio erfolgreich aktualisiert',
        position: { name, anzahl, einstand }
    });
});

// Neues Portfolio erstellen (für Import aus JSON)
export const createPortfolio = asyncHandler(async (req, res) => {
    const { positions, cash } = req.body;

    // Validierung der Eingangsdaten
    if (!positions || !Array.isArray(positions)) {
        return res.status(400).json({ 
            error: 'Positions-Array ist erforderlich' 
        });
    }

    // KEINE Verschlüsselung! Die Daten aus der JSON sind bereits verschlüsselt
    const neuesPortfolio = new Portfolio({
        positions: positions,  // 1:1 aus der JSON übernehmen
        cash: cash || "0"
    });

    await neuesPortfolio.save();

    res.status(201).json({ 
        message: 'Portfolio erfolgreich importiert!',
        id: neuesPortfolio._id,
        anzahlPositionen: positions.length
    });
});