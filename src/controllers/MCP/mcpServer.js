

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
// Pfad bitte an deine Struktur anpassen:
 import { GoogleDrive } from '../../utils/GoogleDrive/googleDriveClass.js';

let googleDrive = null;
const holeGoogleDrive = () => {
    if (!googleDrive) googleDrive = new GoogleDrive();
    return googleDrive;
};

export const erstelleMcpServer = () => {
    const server = new McpServer({
        name: 'obsidian-server',
        version: '1.0.0',
    });

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

    return server;
};