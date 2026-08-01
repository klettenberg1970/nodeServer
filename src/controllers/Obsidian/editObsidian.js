import { drive } from '../../utils/GoogleDrive/googleDrive.js';


export const aktualisiereDatei = async (fileId, neuerInhalt) => {
  const media = {
    mimeType: 'text/markdown',
    body: neuerInhalt,
  };

  const res = await drive.files.update({
    fileId: fileId,
    media: media,
    fields: 'id, name',
  });

  return res.data;
};

export const erstelleDatei = async (ordnerId, name, inhalt) => {
  const fileMetadata = {
    name: `${name}.md`,
    parents: [ordnerId],
  };

  const media = {
    mimeType: 'text/markdown',
    body: inhalt,
  };

  const res = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id, name',
  });

  return res.data;
};