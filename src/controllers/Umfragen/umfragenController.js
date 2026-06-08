import {umfragen} from './umfrageObjekt.js'

export const getUmfragen = async (req, res) => {
    const id = req.params.id
   
    const daten = await umfragen(id);
    
    res.json(daten);
};