


// const werte = ["Database", "Parliaments", "Institutes", "Taskers", "Methods", "Parties", "Surveys"];

const api = 'https://api.dawum.de/';
// const wahlId = '15' // "0" ist die ID für den Bundestag


export const umfragedaten = async (wahlId) => {
    const response = await fetch(api);
    const data = await response.json();

    // Alle Surveys durchgehen und die mit Parliament_ID = "0" sammeln
    const wahl = [];

    for (const id of Object.keys(data.Surveys)) {
        const survey = data.Surveys[id];
        if (survey.Parliament_ID === wahlId) {
            wahl.push({ id, ...survey });
        }
    }

    // Nach Datum sortieren (neueste zuerst)
    wahl.sort((a, b) => new Date(b.Date) - new Date(a.Date));

    // Den neuesten  Wahl-Survey nehmen
    const lastWahl= wahl[0];

   // Neu (gibt Survey UND komplette data zurück):
    const umfragedaten = data.Surveys[lastWahl.id];
    return {
        survey: umfragedaten,
        alleDaten: data  // ← die kompletten API-Daten mit allen Namen!
    };
}




