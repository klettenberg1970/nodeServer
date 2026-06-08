import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import {fetchWikiSummary} from './wikipedia.js'


const rl = readline.createInterface({ input, output });

const prompt = async (text = 'Bitte Ihre Eingabe: ') => {
    const userInput = await rl.question(text);
    return userInput;
};


const main = async() =>{
    const eingabe = await prompt();
    const data = await fetchWikiSummary (eingabe);
      // console.log(data)
        console.log('-------------------')
        console.log(`Titel: ${data.title}`);
        console.log('-------------------')
        console.log(`Beschreibung: ${data.description}`);
        console.log('-------------------')
        console.log(`Zusammenfassung: ${data.extract}`);

 rl.close();
}


main()