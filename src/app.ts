import { faker } from "@faker-js/faker";
import { Colors } from "./enum/colors.enum";
import { IValidations } from "./interface/validations.interface";
import { Validation } from "./validations";
import { ReadWordList } from "./word-file/read-word-list";

export class App {
  validationClass: IValidations;
  constructor() {
    const wordsList = ReadWordList();
    this.validationClass = new Validation(wordsList);

    const randomNumber: number = faker.datatype.number({
      min: 0,
      max: wordsList.length,
    });
    this.selectedWord = wordsList[randomNumber].split("");
  }
  inputedWord: { letter: string; color?: Colors }[] = [];
  private selectedWord: string[];

  execute(word: string): void {
    this.validationClass.originalInputedWord = word;

    this.validationClass.execute();

    this.updateInputedWord().checkIfGreen().checkIfYellow().turnRemainInBlack();
    console.log("Inputed word: ", this.inputedWord);
    console.log(`Selected word: ${this.selectedWord}`);
  }

  private updateInputedWord(): this {
    const originalWordArrayed: string[] =
      this.validationClass.originalInputedWord.split("");
    this.inputedWord = [];
    for (const letter of originalWordArrayed) {
      this.inputedWord.push({ letter });
    }
    return this;
  }

  private turnRemainInBlack(): this {
    this.inputedWord.forEach(({ color }, index) => {
      if (!color) {
        this.inputedWord[index].color = "black";
      }
    });
    return this;
  }

  private checkIfGreen(): this {
    this.selectedWord.map((letter, index) => {
      if (this.inputedWord[index].letter === letter) {
        this.inputedWord[index].color = "green";
      }
    });
    return this;
  }

  private checkIfYellow(): this {
    this.inputedWord.map((letter, index) => {
      const wordColor = this.inputedWord[index].color
      if (this.selectedWord.includes(letter.letter)) {
        if (wordColor !== "green") {
          this.inputedWord[index].color = "yellow";
        }
      }
    });
    return this;
  }
}

const app = new App();
const testes = (word: string) => {
  app.execute(word);
  console.log(app.validationClass.tried.length);
  console.log("=======");
};

testes("teste");
