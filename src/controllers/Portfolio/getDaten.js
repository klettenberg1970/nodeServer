import crypto from 'node:crypto';

function decrypt(text, keyBuffer) {
    const [iv, tag, data] = text.split(':');
    const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
}

export const getDaten = (portfolioDoc) => {
    // 1. Key säubern (Leerzeichen weg, auf 32 kürzen)
    const rawKey = process.env.PORTFOLIO_KEY?.trim().slice(0, 32);

    // 2. Prüfen
    if (!rawKey || rawKey.length !== 32) {
        throw new Error(`Key Fehler: Länge ist ${rawKey ? rawKey.length : 0}`);
    }

    // 3. WICHTIG: Den Buffer für die decrypt-Funktion erstellen
    const keyBuffer = Buffer.from(rawKey);

    return {
        positions: portfolioDoc.positions.map(pos => ({
            Name: pos.Name,
            Y_finance_code: pos.Y_finance_code,
            Anzahl: parseFloat(decrypt(pos.Anzahl, keyBuffer)),
            Einstandswert: parseFloat(decrypt(pos.Einstandswert, keyBuffer))
        })),
        cash: parseFloat(decrypt(portfolioDoc.cash, keyBuffer)),
        
    };
};