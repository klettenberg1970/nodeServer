import mongoose from 'mongoose';

// Explizit die Datenbank "kontakte" nutzen
const kontakteDb = mongoose.connection.useDb('Kontakte');

const kontaktSchema = new mongoose.Schema({
    id: { type: Number, unique: true, sparse: true },
    
    vorname: { type: String },
    nachname: { type: String },
    strasse: { type: String },
    hausnummer: { type: String },
    postleitzahl: { type: String },
    wohnort: { type: String },
    geburtstag: { type: String },
    geburtsjahr: { type: String },
    herkunft: { type: String },
    telefonnummer: { type: String },
    email: { type: String, lowercase: true, sparse: true },
    interessen: { type: String },
    bemerkungen: { type: String },

}, {

    collection: 'Kontakte',
     versionKey: false,
});

// Modell mit der kontakte-Datenbank erstellen
export default kontakteDb.model('Kontakte', kontaktSchema);

