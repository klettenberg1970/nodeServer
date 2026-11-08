import mongoose from 'mongoose';

const NotizenDb = mongoose.connection.useDb('Notizen');

const NotizenSchema = new mongoose.Schema({
    datum: {
        type: String,
        default: () => {
            const d = new Date();
            const tag = String(d.getDate()).padStart(2, '0');
            const monat = String(d.getMonth() + 1).padStart(2, '0');
            return `${tag}.${monat}.${d.getFullYear()}`;
        }
    },
    kategorie: String,
    titel: { type: String, required: true },
    tags: [{ type: String }],
    beschreibung: String,
    link: String,
    prioritaet: String,
    vorschlag: String,
    sonstiges: String,
}, {
    collection: 'notizen',
    versionKey: false,
    timestamps: false
});

const Notizen = NotizenDb.model('Notizen', NotizenSchema);
export default Notizen;