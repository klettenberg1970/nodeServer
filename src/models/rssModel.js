import mongoose from 'mongoose';

const RssDb = mongoose.connection.useDb('RSS');

const rssSchema = new mongoose.Schema(
    {
        kategorie: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        url: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        collection: 'feeds',
        versionKey: false,
    }
);

export default RssDb.model('RSS', rssSchema);