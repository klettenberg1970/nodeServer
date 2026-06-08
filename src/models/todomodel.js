import mongoose from 'mongoose';

const ProjekteDb = mongoose.connection.useDb('Projekte');

// Ein separates Schema für Todo-Einträge mit Datum
const TodoItemSchema = new mongoose.Schema({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const TodoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    todo: [TodoItemSchema],  // Array von Objekten mit text und createdAt
}, {
    collection: 'todo',
    versionKey: false,
    timestamps: true
});

const Todo = ProjekteDb.model('Todo', TodoSchema);
export default Todo;