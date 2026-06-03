import mongoose from 'mongoose';

const LinksDb = mongoose.connection.useDb('Links');

const linkSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true }
}, {
    collection: 'links',
    versionKey: false,
});

export default LinksDb.model('Link', linkSchema);