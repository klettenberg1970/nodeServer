// kurscontroller.js
import Assets from '../../models/assetsmodel.js';
import { YF } from '../../utils/yf_class.js';
import asyncHandler from '../../middleware/asyncHandler.js';

// YF-Instanz - nur mit erlaubten Optionen (cacheTime und minDelay sind nicht mehr erlaubt)
const yf = new YF({
    suppressNotices: ['yahooSurvey']
});

const assetssortieren = (unsortiert) => {
    const kursObjekt = {};
    for (const asset of unsortiert) {
        if (!kursObjekt[asset.kategorie]) {
            kursObjekt[asset.kategorie] = {};
        }
        kursObjekt[asset.kategorie][asset.name] = asset.code;
    }
    return kursObjekt;
}

const preisobjekt = async (kursObjekt) => {
    const kurse = {};
    const alleSymbole = [];

    // 1. Alle Symbole aus deiner Struktur sammeln
    for (const kategorie of Object.values(kursObjekt)) {
        for (const code of Object.values(kategorie)) {
            if (code) alleSymbole.push(code);
        }
    }

    if (alleSymbole.length === 0) return {};

    // 2. Einzelabfragen für jedes Symbol
    const preise = {};
    for (const symbol of alleSymbole) {
        try {
            const preis = await yf.getPreis(symbol);
            preise[symbol] = preis;
        } catch (error) {
            preise[symbol] = null;
        }
    }

    // 3. Die ursprüngliche Struktur wieder befüllen
    for (const [kategorie, assets] of Object.entries(kursObjekt)) {
        kurse[kategorie] = {};
        for (const [name, code] of Object.entries(assets)) {
            kurse[kategorie][name] = preise[code] || null;
        }
    }
    return kurse;
}

export const getAssets = asyncHandler(async (req, res) => {
    const assets = await Assets.find();
    res.json({ assets });
})

// HAUPT-ENDPOINT: Kurse abrufen
export const getkurse = asyncHandler(async (req, res) => {
    const startzeit = Date.now();
    const assetsunsortiert = await Assets.find();

    const kursObjekt = assetssortieren(assetsunsortiert);
    const kurse = await preisobjekt(kursObjekt);

    const dauer = ((Date.now() - startzeit) / 1000).toFixed(2);

    // Sagt dem Browser (und ggf. Proxies), dass er dieses JSON für 5 Min (300 Sek) cachen darf.
    res.set('Cache-Control', 'public, max-age=300');

    res.status(200).json({
        kurse,
        meta: {
            timestamp: new Date().toISOString(),
            anzahlAssets: assetsunsortiert.length,
            dauer: `${dauer}s`,
            cacheStats: yf.getCacheStats()
        }
    });
})

// Asset erstellen
export const createAsset = asyncHandler(async (req, res) => {
    const { kategorie, name, code } = req.body;

    if (!kategorie || !name || !code) {
        return res.status(400).json({
            error: 'Kategorie, Name und Code sind erforderlich'
        });
    }

    const existiert = await Assets.findOne({ name });
    if (existiert) {
        return res.status(409).json({
            error: `Asset "${name}" existiert bereits`
        });
    }

    // Prüfen ob der Code gültig ist
    await yf.getPreis(code);

    const asset = await Assets.create({ kategorie, name, code });

    res.status(201).json({
        message: 'Asset erfolgreich erstellt',
        asset: {
            id: asset._id,
            kategorie: asset.kategorie,
            name: asset.name,
            code: asset.code
        }
    });
})

// Asset löschen
export const deleteAsset = asyncHandler(async (req, res) => {
    const { assetName } = req.body;

    if (!assetName) {
        return res.status(400).json({
            error: 'assetName ist erforderlich'
        });
    }

    const geloescht = await Assets.findOneAndDelete({ name: assetName });

    if (!geloescht) {
        return res.status(404).json({
            error: `Asset "${assetName}" nicht gefunden`
        });
    }

    res.status(200).json({
        message: 'Asset erfolgreich gelöscht',
        asset: {
            name: geloescht.name,
            code: geloescht.code,
            kategorie: geloescht.kategorie
        }
    });
})

// Cache leeren Endpoint
export const clearCache = asyncHandler(async (req, res) => {
    yf.clearCache();
    res.status(200).json({
        message: 'Cache erfolgreich geleert'
    });
})

// Einzelnen Kurs abrufen
export const getEinzelkurs = asyncHandler(async (req, res) => {
    const { code } = req.params;

    if (!code) {
        return res.status(400).json({
            error: 'Code ist erforderlich'
        });
    }

    const preis = await yf.getPreis(code);

    res.status(200).json({
        code,
        preis,
        timestamp: new Date().toISOString()
    });
})

// Cache für Charts-Daten (z. B. 5 Minuten)
const chartsCache = new Map();

const historisch = async (code) => {
    // Prüfe, ob die Daten im Cache sind
    if (chartsCache.has(code)) {
        return chartsCache.get(code);
    }

    // Lade die Daten von Yahoo Finance
    const charts = await yf.getMonatsdaten(code);

    // Speichere die Daten im Cache
    chartsCache.set(code, charts);

    // Cache nach 5 Minuten löschen
    setTimeout(() => {
        chartsCache.delete(code);
    }, 300000); // 5 Minuten

    return charts;
};

export const getCharts = asyncHandler(async (req, res) => {
    const { assetname } = req.body;
    
    if (!assetname) {
        return res.status(400).json({
            error: 'assetname ist erforderlich'
        });
    }
    
    const asset = await Assets.findOne({ name: assetname });
    
    if (!asset) {
        return res.status(404).json({
            error: `Asset "${assetname}" nicht gefunden`
        });
    }
    
    const assetcode = asset.code;
    const charts = await historisch(assetcode);

    res.status(200).json({ charts });
});