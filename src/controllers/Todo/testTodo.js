const API = 'http://127.0.0.1:5000/api/todo';
const username = 'ritch';
const password = '1968';


const testTodo = async () => {
    try {
        const response = await fetch(`${API}/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log('Response:', data);
    } catch (error) {
        console.error('Fehler:', error);
    }
};

testTodo();