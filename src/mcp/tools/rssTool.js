import { z } from 'zod';

const API = 'https://nodeserver-995188789852.europe-west3.run.app';

export const registerRssTools = (server) => {

    // Alle gespeicherten RSS-Feeds abrufen
    server.tool(
        'rss_alle_feeds_abrufen',
        'Gibt alle gespeicherten RSS-Feed-Einträge (Name, URL, Kategorie) aus der Datenbank zurück.',
        {},
        async () => {
            const response = await fetch(`${API}/api/v1/rss/getalledaten`);

            if (!response.ok) {
                const fehler = await response.text();
                return {
                    content: [{ type: 'text', text: `Fehler beim Abrufen der Feeds (${response.status}): ${fehler}` }],
                    isError: true,
                };
            }

            const daten = await response.json();
            return {
                content: [{ type: 'text', text: JSON.stringify(daten, null, 2) }],
            };
        }
    );

    // Inhalte eines bestimmten RSS-Feeds abrufen
    server.tool(
        'rss_feed_lesen',
        'Liest die aktuellen Artikel eines gespeicherten RSS-Feeds anhand seines Namens.',
        {
            name: z.string().describe('Der Name des RSS-Feeds, wie er in der Datenbank gespeichert ist.'),
        },
        async ({ name }) => {
            const response = await fetch(`${API}/api/v1/rss/ausgeben`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                const fehler = await response.text();
                return {
                    content: [{ type: 'text', text: `Fehler beim Lesen des Feeds "${name}" (${response.status}): ${fehler}` }],
                    isError: true,
                };
            }

            const daten = await response.json();
            const items = daten?.feed?.items ?? [];

            if (items.length === 0) {
                return { content: [{ type: 'text', text: 'Keine Einträge gefunden.' }] };
            }

            const ausgabe = items.map(item => ({
                title: item.title,
                erklaerung: item.contentSnippet,
                link: item.link,
            }));

            return {
                content: [{ type: 'text', text: JSON.stringify(ausgabe, null, 2) }],
            };
        }
    );

    // Neuen RSS-Feed anlegen
    server.tool(
        'rss_feed_erstellen',
        'Speichert einen neuen RSS-Feed (Name, URL, Kategorie) in der Datenbank.',
        {
            kategorie: z.string().describe('Kategorie des Feeds, z. B. "Technologie", "News", "Sport".'),
            name: z.string().describe('Eindeutiger Name des Feeds.'),
            url: z.string().url().describe('Die vollständige URL des RSS-Feeds.'),
        },
        async ({ kategorie, name, url }) => {
            const response = await fetch(`${API}/api/v1/rss/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ kategorie, name, url }),
            });

            if (!response.ok) {
                const fehler = await response.text();
                return {
                    content: [{ type: 'text', text: `Fehler beim Erstellen des Feeds (${response.status}): ${fehler}` }],
                    isError: true,
                };
            }

            const daten = await response.json();
            return {
                content: [{ type: 'text', text: JSON.stringify(daten, null, 2) }],
            };
        }
    );

    // RSS-Feed löschen
    server.tool(
        'rss_feed_loeschen',
        'Löscht einen RSS-Feed anhand seiner Datenbank-ID.',
        {
            id: z.string().describe('Die MongoDB-ID des zu löschenden RSS-Feeds.'),
        },
        async ({ id }) => {
            const response = await fetch(`${API}/api/v1/rss/delete/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const fehler = await response.text();
                return {
                    content: [{ type: 'text', text: `Fehler beim Löschen des Feeds (${response.status}): ${fehler}` }],
                    isError: true,
                };
            }

            const daten = await response.json();
            return {
                content: [{ type: 'text', text: `Feed erfolgreich gelöscht: ${JSON.stringify(daten)}` }],
            };
        }
    );
};
