import { umfragedaten } from './getUmfragen.js';

export const umfragen = async (id) => {
    // Das zurückgegebene Objekt enthält survey und alleDaten
    const { survey, alleDaten } = await umfragedaten(id);

    const output = {
        veroeffentlichung: survey.Date,
        zeitraum: `${survey.Survey_Period.Date_Start} bis ${survey.Survey_Period.Date_End}`,
        befragte: survey.Surveyed_Persons,
        parlament: {
            id: survey.Parliament_ID,
            name: alleDaten.Parliaments[survey.Parliament_ID]?.Name || "Unbekannt"
        },
        institut: {
            id: survey.Institute_ID,
            name: alleDaten.Institutes[survey.Institute_ID]?.Name || "Unbekannt"
        },
        auftraggeber: {
            id: survey.Tasker_ID,
            name: alleDaten.Taskers[survey.Tasker_ID]?.Name || "Unbekannt"
        },
        methode: {
            id: survey.Method_ID,
            name: alleDaten.Methods[survey.Method_ID]?.Name || "Unbekannt"
        },
        ergebnisse: {}
    };

    // Ergebnisse mit Parteinamen auflösen
    for (const [parteiId, prozent] of Object.entries(survey.Results)) {
        output.ergebnisse[parteiId] = {
            partei: alleDaten.Parties[parteiId]?.Name || "Unbekannt",
            prozent: prozent,
            kurzform: alleDaten.Parties[parteiId]?.Shortcut || "?"
        };
    }

    // console.log(output);
    return output;
};