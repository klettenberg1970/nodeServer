import { drive, docs } from '../../utils/GoogleDrive/googleDrive.js';


export const dateiLesen = async (fileId) => {  // Parameter umbenannt für Klarheit
    const res = await drive.files.export({ 
        fileId: fileId,  // <-- Hier: fileId, nicht toDoId
        mimeType: 'text/plain' 
    }, { responseType: 'text' });
    return res.data;
};


export const dateiSchreiben = async (fileId, neuerText) => {
  // Sicherstellen, dass es ein String ist
  if (typeof neuerText !== 'string') {
    neuerText = String(neuerText);
  }

  const doc = await docs.documents.get({ documentId: fileId });
  const content = doc.data.body.content;
  const letztePosition = content[content.length - 1].endIndex;

  const requests = [];

  // Nur löschen, wenn tatsächlich Text vorhanden ist
  // (endIndex muss größer als startIndex sein)
  if (letztePosition - 1 > 1) {
    requests.push({
      deleteContentRange: {
        range: {
          startIndex: 1,
          endIndex: letztePosition - 1,
        },
      },
    });
  }

  // Neuen Text einfügen
  if (neuerText.length > 0) {
    requests.push({
      insertText: {
        location: { index: 1 },
        text: neuerText,
      },
    });
  }

  // Nur senden, wenn überhaupt was zu tun ist
  if (requests.length === 0) {
    return { success: true, message: 'Nichts zu tun.' };
  }

  await docs.documents.batchUpdate({
    documentId: fileId,
    requestBody: { requests },
  });

  return { success: true };
};