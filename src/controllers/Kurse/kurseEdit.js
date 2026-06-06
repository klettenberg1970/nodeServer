import Assets from '../../models/assetsmodel.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

// Readline EINMAL erstellen
const rl = readline.createInterface({ input, output });

const prompt = async (text = 'Bitte Ihre Eingabe: ') => {
    const userInput = await rl.question(text);
    return userInput;
};

const assetssortieren = (unsortiert) => {
    const kursObjekt = {};
    for (const asset of unsortiert) {
        if (!kursObjekt[asset.kategorie]) {
            kursObjekt[asset.kategorie] = {};
        }
        kursObjekt[asset.kategorie][asset.name] = asset.code;
    }
    return kursObjekt;
};

const menu = async () => {
    const width = 50;

    console.log("\n" + "═".repeat(width));
    console.log("          ASSETS DATENBANK          ");
    console.log("═".repeat(width));
    console.log();
    console.log("  [1]  Assets anzeigen");
    console.log("  [2]  Asset hinzufügen");
    console.log("  [3]  Asset löschen");
    console.log("  [X]  Abbrechen");
    console.log();
    console.log("─".repeat(width));

    const auswahl = await prompt(' Ihre Wahl > ');
    return auswahl.trim().toUpperCase();
};

const anzeigen = async (kursObjekt) => {

    const alleNamen = [];
    for (const kategorie of Object.values(kursObjekt)) {
        for (const name of Object.keys(kategorie)) {
            alleNamen.push(name);
        }
    }

    console.log('\nVerfügbare Assets:');
    alleNamen.forEach((name, index) => {
        console.log(`  ${index + 1}. ${name}`);
    });
}

const loeschen = async (kursObjekt) => {
    console.log('Sie haben Löschen gewählt');
    const alleNamen = [];
    for (const kategorie of Object.values(kursObjekt)) {
        for (const name of Object.keys(kategorie)) {
            alleNamen.push(name);
        }
    }

    console.log('\nVerfügbare Assets:');
    alleNamen.forEach((name, index) => {
        console.log(`  ${index + 1}. ${name}`);
    });
    const auswahl = await prompt('Bitte die Nummer von dem Asset angeben, das gelöscht werden soll ')
    const name = alleNamen[auswahl - 1]
    await Assets.findOneAndDelete({ name: name });
    console.log('Gelöscht wurde ' + name)
};

const hinzufuegen = async () => {


    const array = ['Aktien', 'ETF', 'Krypto', 'Anleihen'];
    array.forEach((kategorie, index) => {
        console.log(`${index + 1}: ${kategorie}`);
    });
    const e = await prompt('\n Bitte die Kategorie wählen: ');
    const kategorie = array[e - 1]
    const name = await prompt('\n Bitte den Namen: ');
    const code = await prompt(' \n Bitte den YF-Code eingeben : ');

    await Assets.create({ kategorie, name, code });

};

const main = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const assetsunsortiert = await Assets.find();
    const kursObjekt = assetssortieren(assetsunsortiert);

    const auswahl = await menu();

    switch (auswahl) {
        case '1':
            await anzeigen(kursObjekt);
            break;
        case '2':
            await hinzufuegen();
            break;
        case '3':
            await loeschen(kursObjekt);
            break;
        case 'X':
            console.log('Auf Wiedersehen!');
            break;
        default:
            console.log('❌ Ungültige Eingabe!');
    }

    rl.close();
    mongoose.connection.close();
};

main();