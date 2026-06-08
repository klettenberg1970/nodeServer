import Todo from '../../models/todomodel.js'

// ==============================================
// ✅ LOGIN - Benutzer anmelden
// ==============================================

export const checkLoggin = async (req, res) => {
    const { username, password } = req.body;

    console.log(username, password);

    const user = await Todo.findOne({
        username: username,
        password: password
    });

    if (user) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
}

// ==============================================
// ✅ GET - Todos eines Benutzers abrufen
// ==============================================

export const getTodo = async (req, res) => {
    const username = req.params.username;

    const todoObjekt = await Todo.findOne({ username: username })
    res.json(todoObjekt)
}

// ==============================================
// ✅ DELETE - Einzelne Todo löschen
// ==============================================

export const deleteTodo = async (req, res) => {
    const username = req.params.username;
    const { _id } = req.body;

    const todoObjekt = await Todo.findOneAndUpdate(
        { username: username },
        { $pull: { todo: { _id: _id } } },
        { new: true }
    );

    res.json('Aufgabe gelöscht');
}

// ==============================================
// ✅ CREATE - Neue Todo hinzufügen
// ==============================================
export const createNewTodo = async (req, res) => {
    const username = req.params.username;
    const neueAufgabe = req.body;

    const result = await Todo.updateOne(
        { username: username },
        { $push: { todo: { text: neueAufgabe.text } } }
    );

    res.json('neue Aufgabe hinzugefügt');
}

// ==============================================
// ✅ REGISTER - Neuen Benutzer erstellen
// ==============================================

export const createNewUser = async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await Todo.findOne({ username: username });

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'Benutzername ist bereits vergeben. Bitte wählen Sie einen anderen.'
        });
    }

    const newUser = await Todo.create({ username, password });

    res.status(201).json({ success: true });
};