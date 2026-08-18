
import mongoose from 'mongoose';

const PasswortDb = mongoose.connection.useDb('password_manager');

const PasswortSchema = new mongoose.Schema({
    titel: { type: String, required: true },
    username: String,
    password: { type: String, required: true },
    url: String,
    notizen: String,
}, {
    collection: 'passwort_manager',
    versionKey: false,
    timestamps: false
});

const Passwort = PasswortDb.model('Passwort', PasswortSchema);
export default Passwort;