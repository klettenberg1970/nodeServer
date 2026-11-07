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

    server.tool(
        'loescheLink',
        'Lösche einen Link anhand seiner ID',
        {
            id: z.string().describe('Die ID des zu löschenden Links'),
        },
        async ({ id }) => {
            const response = await fetch(`${API}/api/v1/links/delete/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            return {
                content: [
                    {
                        type: 'text',
                        text: response.ok
                            ? `Link erfolgreich gelöscht: ${JSON.stringify(data)}`
                            : `Fehler beim Löschen: ${JSON.stringify(data)}`,
                    },
                ],
                isError: !response.ok,
            };
        }
    );

    server.tool(
        'loescheLinkNachName',
        'Lösche einen Link anhand seines Namens (optional mit Kategorie)',
        {
            name: z.string().describe('Name des zu löschenden Links'),
            category: z.string().optional().describe('Optionale Kategorie des Links'),
        },
        async ({ name, category }) => {
            const response = await fetch(`${API}/api/v1/links/deletebyname`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, category }),
            });

            const data = await response.json();

            return {
                content: [
                    {
                        type: 'text',
                        text: response.ok
                            ? `Link erfolgreich gelöscht: ${JSON.stringify(data)}`
                            : `Fehler beim Löschen: ${JSON.stringify(data)}`,
                    },
                ],
                isError: !response.ok,
            };
        }
    );

    server.tool(
        'verschiebeLink',
        'Verschiebe einen Link in eine andere Kategorie (anhand des Namens und der alten Kategorie)',
        {
            name: z.string().describe('Name des Links'),
            oldCategory: z.string().describe('Name der bisherigen Kategorie'),
            newCategory: z.string().describe('Name der neuen Kategorie'),
        },
        async ({ name, oldCategory, newCategory }) => {
            const response = await fetch(`${API}/api/v1/links/move`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, oldCategory, newCategory }),
            });

            const data = await response.json();

            return {
                content: [
                    {
                        type: 'text',
                        text: response.ok
                            ? `Link erfolgreich verschoben: ${JSON.stringify(data)}`
                            : `Fehler beim Verschieben: ${JSON.stringify(data)}`,
                    },
                ],
                isError: !response.ok,
            };
        }
    );

    server.tool(
        'benenneLinkUm',
        'Benenne einen Link anhand seines bisherigen Namens um',
        {
            oldName: z.string().describe('Bisheriger Name des Links'),
            newName: z.string().describe('Neuer Name des Links'),
        },
        async ({ oldName, newName }) => {
            const response = await fetch(`${API}/api/v1/links/rename`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldName, newName }),
            });

            const data = await response.json();

            return {
                content: [
                    {
                        type: 'text',
                        text: response.ok
                            ? `Link erfolgreich umbenannt: ${JSON.stringify(data)}`
                            : `Fehler beim Umbenennen: ${JSON.stringify(data)}`,
                    },
                ],
                isError: !response.ok,
            };
        }
    );
};
