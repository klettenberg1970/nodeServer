const input = document.querySelector('#formular');

async function laden() {
    const res = await fetch('http://localhost:3000/api/v1/todo');
    const data = await res.json();
    
    // Bereinige den Text vor der Anzeige
    let saubererText = data.inhalt;
    saubererText = saubererText.replace(/^[\r\n]+/, '');  // Entferne leere Zeilen am Anfang
    saubererText = saubererText.replace(/[\r\n]+$/, '');  // Entferne leere Zeilen am Ende
    
    document.getElementById('ausgabe').textContent = saubererText;
}

input.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let eingabeText = formData.get("Text");
    
    // Bereinige die Eingabe VOR dem Speichern
    eingabeText = eingabeText.replace(/^[\r\n]+/, '');
    eingabeText = eingabeText.replace(/[\r\n]+$/, '');
    eingabeText = eingabeText.replace(/[\r\n]{3,}/g, '\n\n');
    
    const res = await fetch('http://localhost:3000/api/v1/todo/change', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: eingabeText })
    });
    
    const data = await res.json();
    console.log('Gespeichert:', data);
    
    setTimeout(() => {
        location.reload();
    }, 1000);
});

laden();