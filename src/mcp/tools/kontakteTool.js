import { z } from 'zod';

const API = 'https://nodeserver-995188789852.europe-west3.run.app';

export const registerKontakteTools = (server) => {

    server.tool(
        'holeKontakte',
        'Hole alle Kontakte aus der Datenbank',
        {},
        async () => {
            const res = await fetch(`${API}/api/v1/kontakte`);
            const data = await res.json();

            return {
                content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
            };
        }
    );

    server.tool(
        'holeKontaktById',
        'Hole einen einzelnen Kontakt anhand seiner ID',
        {
            id: z.number().describe('Die ID des Kontakts'),
        },
        async ({ id }) => {
            const res = await fetch(`${API}/api/v1/kontakte/${id}`);
            const data = await res.json();

            return {
                content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
            };
        }
    );

    server.tool(
        'holeNaechsteKontaktId',
        'Gibt die nächste freie ID für einen neuen Kontakt zurück',
        {},
        async () => {
            const res = await fetch(`${API}/api/v1/kontakte/next-id`);
            const data = await res.json();

            return {
                content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
            };
        }
    );

    server.tool(
        'erstelleKontakt',
        'Erstelle einen neuen Kontakt in der Datenbank',
        {
            id: z.number().describe('Eindeutige ID des Kontakts'),
            kategorie: z.string().optional().describe('Kategorie des Kontakts, z.B. "Familie", "Freunde", "Arbeit"'),
            vorname: z.string().describe('Vorname des Kontakts'),
            nachname: z.string().describe('Nachname des Kontakts'),
            strasse: z.string().optional().describe('Straße der Adresse'),
            hausnummer: z.string().optional().describe('Hausnummer'),
            postleitzahl: z.string().optional().describe('Postleitzahl'),
            wohnort: z.string().optional().describe('Wohnort'),
            geburtstag: z.string().optional().describe('Geburtstag (Tag und Monat), z.B. "15.03"'),
            geburtsjahr: z.string().optional().describe('Geburtsjahr, z.B. "1990"'),
            herkunft: z.string().optional().describe('Herkunft des Kontakts'),
            telefonnummer: z.string().optional().describe('Telefonnummer'),
            email: z.string().optional().describe('E-Mail-Adresse'),
            interessen: z.string().optional().describe('Interessen des Kontakts'),
            bemerkungen: z.string().optional().describe('Sonstige Bemerkungen'),
        },
        async (args) => {
            const response = await fetch(`${API}/api/v1/kontakte/create`, {
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
                            text: `Fehler beim Erstellen des Kontakts (${response.status}): ${fehler}`,
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
                        text: `Kontakt erfolgreich erstellt: ${JSON.stringify(daten, null, 2)}`,
                    },
                ],
            };
        }
    );

    server.tool(
        'aktualisiereKontakt',
        'Aktualisiere einen bestehenden Kontakt anhand seiner ID',
        {
            id: z.number().describe('Die ID des zu aktualisierenden Kontakts'),
            kategorie: z.string().optional(),
            vorname: z.string().optional(),
            nachname: z.string().optional(),
            strasse: z.string().optional(),
            hausnummer: z.string().optional(),
            postleitzahl: z.string().optional(),
            wohnort: z.string().optional(),
            geburtstag: z.string().optional(),
            geburtsjahr: z.string().optional(),
            herkunft: z.string().optional(),
            telefonnummer: z.string().optional(),
            email: z.string().optional(),
            interessen: z.string().optional(),
            bemerkungen: z.string().optional(),
        },
        async ({ id, ...updateData }) => {
            const response = await fetch(`${API}/api/v1/kontakte/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                const fehler = await response.text();
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Fehler beim Aktualisieren des Kontakts (${response.status}): ${fehler}`,
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
                        text: `Kontakt erfolgreich aktualisiert: ${JSON.stringify(daten, null, 2)}`,
                    },
                ],
            };
        }
    );

    server.tool(
        'loescheKontakt',
        'Lösche einen Kontakt anhand seiner ID',
        {
            id: z.number().describe('Die ID des zu löschenden Kontakts'),
        },
        async ({ id }) => {
            const response = await fetch(`${API}/api/v1/kontakte/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const fehler = await response.text();
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Fehler beim Löschen des Kontakts (${response.status}): ${fehler}`,
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
                        text: `Kontakt erfolgreich gelöscht: ${JSON.stringify(daten, null, 2)}`,
                    },
                ],
            };
        }
    );

};
