import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KEYFILEPATH = path.join(__dirname, 'credentials.json');

// WICHTIG: Beide Scopes müssen vorhanden sein!
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/documents'
];

const auth = new google.auth.GoogleAuth({
  ...(process.env.NODE_ENV === 'production'
    ? { keyFile: '/etc/secrets/credentials.json' }
    : { keyFile: KEYFILEPATH }),
  scopes: SCOPES,
});

// Exportiere beide Instanzen
export const drive = google.drive({ version: 'v3', auth });
export const docs = google.docs({ version: 'v1', auth });