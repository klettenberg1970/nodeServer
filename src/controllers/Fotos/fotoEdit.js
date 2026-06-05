import { drive } from '../../utils/GoogleDrive/googleDrive.js'

export const loescheFoto = async(id)=>{
  const file = await drive.files.get({
    fileId: id,
    fields: 'parents'
  });
  
  const parentId = file.data.parents[0];
  
  await drive.files.update({
    fileId: id,
    addParents: '195-OYyKk1YsQf1CJf4k4Nh0dOX2hoQ83',
    removeParents: parentId,
    fields: 'id, parents'
  });
  console.log(`Foto mit der ID ${id} wurde in den Papierkorb verschoben`)
}



export const verschiebeFoto = async(id, zielOrdnerId)=>{
  const file = await drive.files.get({
    fileId: id,
    fields: 'parents'
  });
  
  const parentId = file.data.parents[0];
  
  await drive.files.update({
    fileId: id,
    addParents: zielOrdnerId,
    removeParents: parentId,
    fields: 'id, parents'
  });
  console.log(`Foto wurde in Ordner ${zielOrdnerId} verschoben`)
}