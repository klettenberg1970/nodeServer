import { drive } from '../../utils/GoogleDrive/googleDrive.js';

export const kompletteDateien = async  (folderId) => {
    // Google Drive API Aufruf für Ordner-Inhalt
    const files = await drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        fields: 'files(id, name, mimeType)'
    });
    
    const result = {
        ordner: [],
        dateien: []
    };
    
    for (const file of files.data.files) {
        if (file.mimeType === 'application/vnd.google-apps.folder') {
            // Rekursiv Unterordner abrufen
            const subFolder = await kompletteDateien(file.id);
            result.ordner.push({
                name: file.name,
                id: file.id,
                inhalt: subFolder
            });
        } else {
            result.dateien.push(file);
        }
    }
    
    return result;
}