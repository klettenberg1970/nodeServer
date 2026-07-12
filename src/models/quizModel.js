import mongoose from 'mongoose';

const quizDb = mongoose.connection.useDb('Quiz');

const quizSchema = new mongoose.Schema({
    id: { type: Number, 
        unique: true, 
        sparse: true },

    thema: { type: String ,
         required: true,
         index: true
    },

    unterthema: { type: String },

    schwierigkeit: { type: String ,
        enum: ['leicht', 'mittel', 'schwer'],
    },

   tags: { type: [String],
     default: [] },

    frage: { type: String ,
        required: true },

    antwort: { type: String,
        required: true  },

    optionen: {
        type: [String],  // Array von Strings
        required: false,
        default: []
    },
    erklaertext: { type: String },
}, {

    collection: 'Quizfragen',
    versionKey: false,
})


 
export default quizDb.model('Quiz', quizSchema);
