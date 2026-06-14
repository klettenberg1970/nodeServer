import { google } from 'googleapis';

// 1. Hole die Credentials aus der Umgebungsvariable
// Da es ein JSON-String ist, müssen wir ihn parsen
const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON 
  ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) 
  : null;

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/documents'
];

// 2. Initialisiere Auth
// Wenn credentials vorhanden sind, nutzen wir diese, sonst das Standard-Verfahren
const auth = new google.auth.GoogleAuth({
  ...(credentials ? { credentials } : { keyFile: './credentials.json' }),
  scopes: SCOPES,
});

// Exportiere beide Instanzen
export const drive = google.drive({ version: 'v3', auth });
export const docs = google.docs({ version: 'v1', auth });