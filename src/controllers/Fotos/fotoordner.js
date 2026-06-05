import {drive} from '../../utils/GoogleDrive/googleDrive.js'

export const fotoOrdner = async () => {

const ordnerSuche = await drive.files.list({
    q: "name = 'Fotos' and mimeType = 'application/vnd.google-apps.folder'",
    fields: 'files(id, name)',
  });

  const fotoOrdnerId = ordnerSuche.data.files[0].id;

 const unterordnerVon = async (ordnerId) => {
    const response = await drive.files.list({
      q: `'${ordnerId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
      pageSize: 100,
      fields: 'files(id, name)',
    });

    const ordner = response.data.files;

    await Promise.all(
      ordner.map(async (ordner_) => {
        ordner_.unterordner = await unterordnerVon(ordner_.id);
      })
    );

    return ordner;
  };

  return unterordnerVon(fotoOrdnerId);
};