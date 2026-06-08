export async function fetchWikiSummary(suche) {
    // 1. SCHRITT: Den exakten Titel finden via Opensearch
    const searchUrl = `https://de.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(suche)}&limit=1&format=json&origin=*`;

    try {
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        // searchData[1] enthält eine Liste gefundener Titel
        if (!searchData[1] || searchData[1].length === 0) {
            console.log("Nichts gefunden für:", suche);
            return;
        }

        const korrekterTitel = searchData[1][0]; // Der erste (beste) Treffer
        

        // 2. SCHRITT: Jetzt erst die Summary mit dem korrekten Titel holen
        const url = `https://de.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(korrekterTitel)}`;

        const response = await fetch(url, {
            headers: { 'User-Agent': 'LernBot/1.0 (deine@mail.de)' }
        });

        if (!response.ok) throw new Error(`Fehler: ${response.status}`);

        const data = await response.json();

        return data

      

    } catch (error) {
        console.error("Abruf fehlgeschlagen:", error.message);
    }
}

