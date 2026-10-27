import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
// Pfad bitte an deine Struktur anpassen:
import { GoogleDrive } from '../../utils/GoogleDrive/googleDriveClass.js';

let googleDrive = null;
const holeGoogleDrive = () => {
    if (!googleDrive) googleDrive = new GoogleDrive();
    return googleDrive;
};

// ---------------------------------------------------------------
// Hilfsfunktionen (außerhalb von erstelleMcpServer, nur in dieser Datei)
// ---------------------------------------------------------------

// Ordner, in dem neue MD-Dateien angelegt und bestehende gesucht werden
// (Google-Drive-ID, bitte eintragen):
const STANDARD_ORDNER_ID = '1yDIjIArVucBW_f_MRiVu3C1aEUq71_Sr';

const mitMdEndung = (name) => (name.toLowerCase().endsWith('.md') ? name : `${name}.md`);

// Sammelt rekursiv alle Einträge mit id und name aus der Ordnerliste
const sammleDateien = (daten, treffer = []) => {
    if (Array.isArray(daten)) {
        daten.forEach((eintrag) => sammleDateien(eintrag, treffer));
    } else if (daten && typeof daten === 'object') {
        if (typeof daten.name === 'string' && daten.id) {
            treffer.push({ id: daten.id, name: daten.name });
        }
        Object.values(daten).forEach((wert) => {
            if (wert && typeof wert === 'object') sammleDateien(wert, treffer);
        });
    }
    return treffer;
};

// Findet die Datei-ID zu einem Dateinamen im Standardordner (inklusive Unterordner)
const findeDateiIdByName = async (dateiName) => {
    const name = mitMdEndung(dateiName).toLowerCase();
    const daten = await holeGoogleDrive().getKompletteDateien(STANDARD_ORDNER_ID);
    if (daten.success === false) {
        throw new Error(`Ordnerliste nicht lesbar: ${daten.message}`);
    }
    const alle = sammleDateien(daten);
    const treffer = alle.filter((datei) => datei.name.toLowerCase() === name);
    if (treffer.length === 0) {
        const vorschau = alle.slice(0, 20).map((datei) => datei.name).join(', ');
        throw new Error(`"${dateiName}" nicht gefunden. Gefundene Dateien (max. 20): ${vorschau}`);
    }
    if (treffer.length > 1) {
        throw new Error(`"${dateiName}" ist nicht eindeutig (${treffer.length} Treffer), es wird nichts geschrieben.`);
    }
    return treffer[0].id;
};

// ---------------------------------------------------------------
// MCP-Server mit allen Tools
// ---------------------------------------------------------------

export const erstelleMcpServer = () => {
    const server = new McpServer({
        name: 'obsidian-server',
        version: '1.0.0',
    });

    // ---------- Lesende Tools ----------

    server.tool(
        'listeObsidianDateien',
        'Listet alle Markdown-Dateien eines Obsidian-Ordners in Google Drive (inklusive Unterordner) anhand der Ordner-ID',
        { ordnerId: z.string().describe('Google-Drive-ID des Ordners') },
        async ({ ordnerId }) => {
            try {
                const daten = await holeGoogleDrive().getKompletteDateien(ordnerId);
                return { content: [{ type: 'text', text: JSON.stringify(daten, null, 2) }] };
            } catch (fehler) {
                return { isError: true, content: [{ type: 'text', text: `Fehler: ${fehler.message}` }] };
            }
        }
    );

    server.tool(
        'leseMdDatei',
        'Liest den Inhalt einer Markdown-Datei aus Obsidian/Google Drive anhand der Datei-ID',
        { dateiId: z.string().describe('Google-Drive-ID der MD-Datei') },
        async ({ dateiId }) => {
            try {
                const md = await holeGoogleDrive().getMdByID(dateiId);
                const text = md.singleDatei ?? JSON.stringify(md, null, 2);
                return { content: [{ type: 'text', text }] };
            } catch (fehler) {
                return { isError: true, content: [{ type: 'text', text: `Fehler: ${fehler.message}` }] };
            }
        }
    );

    server.tool(
        'leseMdDateiByName',
        'Sucht in Obsidian/Google Drive eine Markdown-Datei anhand ihres Dateinamens und liefert deren Inhalt',
        { dateiName: z.string().describe('Name der MD-Datei, z.B. "express.md"') },
        async ({ dateiName }) => {
            try {
                const daten = await holeGoogleDrive().getMdByName(dateiName);
                if (daten.success === false) {
                    return { isError: true, content: [{ type: 'text', text: `Fehler bei der Dateisuche: ${daten.message}` }] };
                }
                const text = daten.datei ?? JSON.stringify(daten, null, 2);
                return { content: [{ type: 'text', text }] };
            } catch (fehler) {
                return { isError: true, content: [{ type: 'text', text: `Fehler: ${fehler.message}` }] };
            }
        }
    );

    // ---------- Schreibende Tools ----------

    server.tool(
        'erstelleMd',
        'Erstellt eine neue Markdown-Datei mit Inhalt in Obsidian/Google Drive. Wenn kein Ordner angegeben ist, wird der Standardordner verwendet.',
        {
            dateiName: z.string().describe('Name der neuen Datei, z.B. "ideen.md"'),
            inhalt: z.string().describe('Kompletter Markdown-Inhalt der neuen Datei'),
            ordnerId: z.string().optional().describe('Optional: Google-Drive-ID des Zielordners'),
        },
        async ({ dateiName, inhalt, ordnerId }) => {
            try {
                const ziel = ordnerId ?? STANDARD_ORDNER_ID;
                const ergebnis = await holeGoogleDrive().createNewMdDatei(ziel, dateiName.replace(/\.md$/i, ''), inhalt);
                if (ergebnis.success === false) {
                    return { isError: true, content: [{ type: 'text', text: `Fehler beim Erstellen: ${ergebnis.message}` }] };
                }
                return { content: [{ type: 'text', text: `Datei erstellt:\n${JSON.stringify(ergebnis, null, 2)}` }] };
            } catch (fehler) {
                return { isError: true, content: [{ type: 'text', text: `Fehler: ${fehler.message}` }] };
            }
        }
    );

    server.tool(
        'ergaenzeMd',
        'Hängt einen Eintrag am Ende einer bestehenden Markdown-Datei an. Der vorhandene Inhalt bleibt erhalten.',
        {
            dateiName: z.string().describe('Name der bestehenden Datei, z.B. "ideen.md"'),
            eintrag: z.string().describe('Text, der am Ende angehängt wird'),
        },
        async ({ dateiName, eintrag }) => {
            try {
                const id = await findeDateiIdByName(dateiName);
                const md = await holeGoogleDrive().getMdByID(id);
                const aktuellerText = md.singleDatei ?? md.datei;
                if (typeof aktuellerText !== 'string') {
                    throw new Error('Aktueller Inhalt konnte nicht gelesen werden, es wird nichts geschrieben.');
                }
                const neuerText = aktuellerText.length > 0 ? `${aktuellerText}\n${eintrag}` : eintrag;
                const ergebnis = await holeGoogleDrive().updateMdDatei(neuerText, id);
                if (ergebnis.success === false) {
                    return { isError: true, content: [{ type: 'text', text: `Fehler beim Ergänzen: ${ergebnis.message}` }] };
                }
                return { content: [{ type: 'text', text: `Eintrag an ${mitMdEndung(dateiName)} angehängt.` }] };
            } catch (fehler) {
                return { isError: true, content: [{ type: 'text', text: `Fehler: ${fehler.message}` }] };
            }
        }
    );

    server.tool(
        'updateMd',
        'Ersetzt den KOMPLETTEN Inhalt einer bestehenden Markdown-Datei durch neuen Text. Der alte Inhalt wird überschrieben.',
        {
            dateiName: z.string().describe('Name der bestehenden Datei, z.B. "ideen.md"'),
            inhalt: z.string().describe('Neuer, vollständiger Inhalt der Datei'),
        },
        async ({ dateiName, inhalt }) => {
            try {
                const id = await findeDateiIdByName(dateiName);
                const ergebnis = await holeGoogleDrive().updateMdDatei(inhalt, id);
                if (ergebnis.success === false) {
                    return { isError: true, content: [{ type: 'text', text: `Fehler beim Update: ${ergebnis.message}` }] };
                }
                return { content: [{ type: 'text', text: `${mitMdEndung(dateiName)} wurde neu geschrieben.` }] };
            } catch (fehler) {
                return { isError: true, content: [{ type: 'text', text: `Fehler: ${fehler.message}` }] };
            }
        }
    );

    return server;
};