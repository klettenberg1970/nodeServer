import { drive, docs } from '../../utils/GoogleDrive/googleDrive.js';

const toDoId = '1LotmSZ37UUnLDGcOXpKEGTwoBtJDk0C1wIqB1VayEVc';

export const dateiLesen = async (fileId) => {  // Parameter umbenannt für Klarheit
    const res = await drive.files.export({ 
        fileId: fileId,  // <-- Hier: fileId, nicht toDoId
        mimeType: 'text/plain' 
    }, { responseType: 'text' });
    return res.data;
};


export const dateiSchreiben = async (fileId, text) => {
    const doc = await docs.documents.get({ documentId: fileId });
    const endIndex = doc.data.body.content[doc.data.body.content.length - 1].endIndex;
    
    await docs.documents.batchUpdate({
        documentId: fileId,
        requestBody: {
            requests: [{
                insertText: { 
                    location: { index: endIndex - 1 }, 
                    text: `\n${text}` 
                }
            }]
        }
    });
};

// const main = async () => {
//     const text = '2. Ich muss meine Wohnung renovieren'
//     const eingabe = await dateiSchreiben(toDoId, text)
//     const inhalt = await dateiLesen(toDoId);  // ID übergeben
//     console.log(inhalt);
// };

// main();