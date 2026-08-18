
import Passwort from '../../models/passwoerterModel.js';
import asyncHandler from '../../middleware/asyncHandler.js';


export const getPasswoerter = asyncHandler(async (req, res) => {
    const passwoerter = await Passwort.find();
 
    res.json(passwoerter)
})


export const createPasswort = asyncHandler(async (req, res) => {

    const passwort = {
        titel: req.body.titel,
        username: req.body.username, // Verschlüsselt
        password: req.body.password, // Verschlüsselt
        url: req.body.url,
        notizen: req.body.notizen
    };
 const password = await Passwort.create(passwort);
    console.log(passwort);

   

    // const gespeichert = await passwort.save();
    res.status(201).json({message:'gespeichert'});

});


export const deletePasswort = asyncHandler(async (req, res) => {

    const id = req.params.id;
    await Passwort.findOneAndDelete({ _id: id });
    res.json('Erfolg');
});