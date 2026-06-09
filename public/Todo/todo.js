const input = document.querySelector('#formular');

async function laden() {
    const res = await fetch('http://localhost:3000/api/v1/todo');
    const data = await res.json();
    console.log(data);
    document.getElementById('ausgabe').textContent = data.inhalt;
}

input.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const eingabeText = formData.get("Text");
    console.log(eingabeText);
});  

laden();