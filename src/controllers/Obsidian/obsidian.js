import { drive } from '../../utils/GoogleDrive/googleDrive.js';

const obsidianOrdnerId = '1yDIjIArVucBW_f_MRiVu3C1aEUq71_Sr';
const projekteOrdnerId = '1AT5HewKbCqkGsjf4qPERN8kh4jTgjPZt';
const startDateiId ='1mntDdSTlnfK9nOnl6VJreiKIv6ANvHOt';
const linksId = '1Hy7BlW81IaEi1baXFn5KqhZIkGM12FX6'




export const startDatei = async () => {
  const res = await drive.files.get(
    { fileId: startDateiId, alt: 'media' },
    { responseType: 'text' }
  );

  return res.data;
}


export const projekteOrdner = async () => {
  const res = await drive.files.list({
    q: `'${projekteOrdnerId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
    fields: 'files(id, name)',
  });
  return res.data.files;
};

export const dateien = async (id) => {

  const res  = await drive.files.list({
      q: `'${id}' in parents`,
      fields: 'files(id, name, mimeType)',
    });
    return res.data.files;
}

export const getDateiByID = async (id) => {
  const res = await drive.files.get(
    { fileId: id, alt: 'media' },
    { responseType: 'text' }
  );

  return res.data;
}

export const getDateiByName = async (name) => {
  const suche = await drive.files.list({
    q: `name = '${name}.md'`,
    fields: 'files(id, name)',
  });

  const datei = suche.data.files[0];
  if (!datei) return null;

  const res = await drive.files.get(
    { fileId: datei.id, alt: 'media' },
    { responseType: 'text' }
  );

  return res.data;
}