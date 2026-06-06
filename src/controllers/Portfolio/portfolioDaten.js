import * as yf_class from '../../utils/yf_class.js';

const yf = new yf_class.YF();

export default async function Portfoliodaten(entschluesselteDaten) {
    let summe = 0;
    let gv_gesamt = 0;

    // 1. Alle Kurse parallel abrufen (Turbo-Modus)
    const preisVersprechen = entschluesselteDaten.positions.map(pos => 
        yf.getPreis(pos.Y_finance_code)
    );

    const allePreise = await Promise.all(preisVersprechen);

    // 2. Daten für Cards aufbereiten
    const cards = entschluesselteDaten.positions.map((position, index) => {
        const preis = allePreise[index] || 0; // Fallback auf 0, falls Kurs fehlt
        const anzahl = position.Anzahl;
        const einstandswert = position.Einstandswert;
        
        const gesamt = preis * anzahl;
        const differenz = gesamt - einstandswert;
        const prozent = einstandswert !== 0 ? (differenz / einstandswert) * 100 : 0;

        summe += gesamt;
        gv_gesamt += differenz;

        return {
            name: position.Name,
         anzahl: anzahl,
            kurs: preis.toFixed(2),
            wertGesamt: gesamt.toFixed(2),
            einstand: einstandswert.toFixed(2),
            differenz: differenz.toFixed(2),
            differenzProzent: prozent.toFixed(2) + " %",
            istPositiv: differenz >= 0 // Hilfreich für CSS (grün/rot)
        };
    });

    // 3. Finale Rückgabe für das Frontend
    return {
        portfolio: cards,
        statistik: {
            depotwert: summe.toFixed(2),
            gewinnVerlust: gv_gesamt.toFixed(2),
            cash: entschluesselteDaten.cash.toFixed(2),
            gesamtKapital: (summe + entschluesselteDaten.cash).toFixed(2)
        }
    };
}