import { ApiDicionario } from "./api-dicionario";

export class App {
  constructor() {}

  async WordGenerator() {
    let tentativas = 0;
    let word: string;

    while (!(word?.length >= 5 && word?.length <= 10)) {
      tentativas += 1;
      const objectRandomWord = await ApiDicionario("random");

      word = objectRandomWord.data.word;
    }

    console.log(tentativas);
    console.log(`final word: ${word}, tamanho: ${word.length}`);
    return word;
  }
}

console.time("teste");
const app = new App();
app.WordGenerator();

console.timeEnd("teste");
