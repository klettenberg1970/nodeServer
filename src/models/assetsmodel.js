import mongoose from 'mongoose';

const FinanzenDb = mongoose.connection.useDb('Finanzen');

const assetsSchema = new mongoose.Schema({
    kategorie: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    collection: 'assets',
    versionKey: false,  // ← Das entfernt __v
});

export default FinanzenDb.model('Assets', assetsSchema);