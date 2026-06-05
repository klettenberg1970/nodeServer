
import { drive } from '../../utils/GoogleDrive/googleDrive.js'

export const getFotosVonOrdner = async (ordnerId) => {
    const response = await drive.files.list({
        q: `'${ordnerId}' in parents and mimeType contains 'image/'`,
        pageSize: 100,
        fields: 'files(id, name)',
    });

    return response.data.files.map(foto => ({
        id: foto.id,
        name: foto.name,
       url: `https://lh3.googleusercontent.com/d/${foto.id}`
        
    }));
};