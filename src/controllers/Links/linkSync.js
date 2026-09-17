
import Link from '../../models/linksmodel.js';
import { linkarray } from './linkarray.js';
import { Obsidian } from '../../utils/obsidianClass.js'; // Pfad bitte prüfen/anpassen

const linksMdId = '1Hy7BlW81IaEi1baXFn5KqhZIkGM12FX6';

// JSON-Objekt → Markdown umwandeln
const jsonZuMarkdown = (daten) => {
    let md = '';

    for (const [kategorie, links] of Object.entries(daten)) {
        md += `## ${kategorie}\n\n`;

        for (const [name, url] of Object.entries(links)) {
            md += `- [${name.trim()}](${url})\n`;
        }

        md += '\n';
    }

    return md.trim();
};

// Wird nach create/delete aufgerufen, um links.md zu aktualisieren
export const syncLinksZuMd = async () => {
    try {
        const linkunsortiert = await Link.find();
        const links = linkarray(linkunsortiert);
        const mdText = jsonZuMarkdown(links);

        const obsidian = new Obsidian();
        await obsidian.updateMdDatei(mdText, linksMdId);
    } catch (error) {
        // Fehler beim Sync soll die eigentliche create/delete-Response nicht zum Absturz bringen
        console.error('Fehler beim Synchronisieren der Links-Markdown-Datei:', error);
    }
};