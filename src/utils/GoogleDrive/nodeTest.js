import { drive, docs } from './googleDrive.js';

const DATEI_NAME = 'NodeTest';

const dateiLesen = async (fileId) => {
    const res = await drive.files.export({ fileId, mimeType: 'text/plain' }, { responseType: 'text' });
    return res.data;
};

const dateiSchreiben = async (fileId, text) => {
    const doc = await docs.documents.get({ documentId: fileId });
    const index = doc.data.body.content.slice(-1)[0].endIndex;

    await docs.documents.batchUpdate({
        documentId: fileId,
        requestBody: {
            requests: [{
                insertText: { 
                    location: { index: index - 1 }, 
                    text: `\n${text}` 
                }
            }]
        }
    });
};

const main = async () => {
    const list = await drive.files.list({ q: `name = '${DATEI_NAME}'` });
    const fileId = list.data.files[0]?.id;
    if (!fileId) return;

    const zeitstempel = new Date().toLocaleString('de-DE');
    await dateiSchreiben(fileId, `Update: ${zeitstempel}`);
    
    const inhalt = await dateiLesen(fileId);
    console.log(inhalt);
};

main();