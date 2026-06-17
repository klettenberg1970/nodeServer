import { google } from 'googleapis';
import { readFileSync } from 'fs';

// 1. Hole die Credentials aus der Umgebungsvariable
const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON 
  ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) 
  : (() => { try { return JSON.parse(readFileSync('./src/utils/GoogleDrive/credentials.json', 'utf8')); } catch(e) { return null; } })();

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/documents'
];

// 2. Initialisiere Auth
const auth = new google.auth.GoogleAuth({
  ...(credentials ? { credentials } : { keyFile: './credentials.json' }),
  scopes: SCOPES,
});

export const drive = google.drive({ version: 'v3', auth });
export const docs = google.docs({ version: 'v1', auth });