import { z } from 'zod';

const API = 'https://nodeserver-995188789852.europe-west3.run.app';

export const registerLinksTools = (server) => {
    server.tool(
        'holeLinks',
        'Hole alle Links aus der Datenbank, inklusive Kategorie, Links und Url',
        {},
        async () => {
            const res = await fetch(`${API}/api/v1/links`);
            const data = await res.json();

            return {
                content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
            };
        }
    );

    server.tool(
        'erstelleLink',
        'Erstelle einen neuen Link mit Kategorie, Name und Url',
        {
            name: z.string().describe('Name des Links'),
            url: z.string().describe('die Url'),
            category: z.string().describe('Name der Kategorie'),
        },
        async ({ name, url, category }) => {
            const response = await fetch(`${API}/api/v1/links/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, url, category }),
            });

            const data = await response.json();

            return {
                content: [
                    {
                        type: 'text',
                        text: response.ok
                            ? `Link erfolgreich erstellt: ${JSON.stringify(data)}`
                            : `Fehler beim Erstellen: ${JSON.stringify(data)}`,
                    },
                ],
                isError: !response.ok,
            };
        }
    );
};
