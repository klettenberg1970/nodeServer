import { drive, docs } from '../../utils/GoogleDrive/googleDrive.js';

const toDoId = '1LotmSZ37UUnLDGcOXpKEGTwoBtJDk0C1wIqB1VayEVc';

export const dateiLesen = async (fileId) => {  // Parameter umbenannt für Klarheit
    const res = await drive.files.export({ 
        fileId: fileId,  // <-- Hier: fileId, nicht toDoId
        mimeType: 'text/plain' 
    }, { responseType: 'text' });
    return res.data;
};


export const dateiSchreiben = async (fileId, neuerText) => {
    // 1. Dokument abrufen, um die Länge zu kennen
    const doc = await docs.documents.get({ documentId: fileId });
    
    // 2. Die letzte Position im Dokument finden
    const content = doc.data.body.content;
    const letztePosition = content[content.length - 1].endIndex;
    
    // 3. EINEN Batch-Request mit zwei Aktionen:
    const requests = [
        // Aktion 1: Alten Text löschen (von Position 1 bis vor das letzte Zeichen)
        {
            deleteContentRange: {
                range: {
                    startIndex: 1,
                    endIndex: letztePosition - 1  // Das letzte Zeichen behalten
                }
            }
        },
        // Aktion 2: Neuen Text einfügen (an Position 1)
        {
            insertText: {
                location: { index: 1 },
                text: neuerText
            }
        }
    ];
    
    // 4. Beides zusammen ausführen
    await docs.documents.batchUpdate({
        documentId: fileId,
        requestBody: { requests }
    });
};