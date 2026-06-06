// editPortfolio.js
import crypto from 'node:crypto';

export function update(text, key) {
    // Schlüssel auf 32 Byte vorbereiten
    const keyBuffer = Buffer.from(key.trim().slice(0, 32));
    
    // Zufalls-Vektor (IV)
    const iv = crypto.randomBytes(12);
    
    // Verschlüsselungs-Werkzeug (AES-GCM)
    const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, iv);
    
    // Den Text verschlüsseln
    let data = cipher.update(String(text), 'utf8', 'hex');
    data += cipher.final('hex');
    
    // Das Siegel (Auth-Tag) generieren
    const tag = cipher.getAuthTag().toString('hex');
    
    // Das Paket für getDaten.js schnüren: iv:tag:data
    return `${iv.toString('hex')}:${tag}:${data}`;
}