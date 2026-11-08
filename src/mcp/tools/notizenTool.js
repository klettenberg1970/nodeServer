import { z } from 'zod';

const API = 'https://nodeserver-995188789852.europe-west3.run.app';

export const registerNotizenTool = (server) => {

    server.tool(
        'Notiz erstellen',
        'erstelle eine neue Notiz',
        {
            kategorie: z.string().optional(),
            titel: z.string(),
            tags: z.array(z.string()).optional(),
            beschreibung: z.string().optional(),
            link: z.string().optional(),
            prioritaet: z.string().optional(),
            vorschlag: z.string().optional(),
            sonstiges: z.string().optional(),
        },
        async (args) => {
            const response = await fetch(`${API}/api/v1/notizen/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(args),
            });

            if (!response.ok) {
                const fehler = await response.text();
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Fehler beim Erstellen der Notiz (${response.status}): ${fehler}`,
                        },
                    ],
                    isError: true,
                };
            }

            const daten = await response.json();

            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(daten, null, 2),
                    },
                ],
            };
        }
    );

};