import { faker } from "@faker-js/faker";
import fs from "fs";
import { Colors } from "./colors.enum";


export class App {
  constructor() {
    const wordsList: string[] = fs
      .readFileSync("words-with-5-letters.txt", "utf-8")
      .split("\n");
    const randomNumber: number = faker.datatype.number({
      min: 0,
      max: wordsList.length,
    });
    this.selectedWord = wordsList[randomNumber].split("");
  }
  private originalInputedWord: string;
  private inputedWord: { letter: string; color?: Colors }[] = [];
  private selectedWord: string[];
  tried: string[] = [];

  execute(word: string): void {
    this.originalInputedWord = word;

    this.verifyTries()
      .verifyRepeatedTry()
      .updateInputedWord()
      .validateLength()
      .verifyWord()
      .checkIfGreen()
      .checkIfYellow()
      .turnRemainInBlack();
    console.log("Inputed word: ", this.inputedWord);
    console.log(`Selected word: ${this.selectedWord}`);
  }

  private updateInputedWord(): this {
    this.tried.push(this.originalInputedWord);
    this.inputedWord = [];
    for (const letter of this.originalInputedWord.split("")) {
      this.inputedWord.push({ letter });
    }
    return this;
  }

  private validateLength(): this {
    if (this.inputedWord.length !== 5) {
      throw new Error("Incorrect Length");
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
      if (this.selectedWord.includes(letter.letter)) {
        if (this.inputedWord[index].color !== "green") {
          this.inputedWord[index].color = "yellow";
        }
      }
    });
    return this;
  }

  private verifyWord(): this {
    const words = fs
      .readFileSync("words-with-5-letters.txt", "utf-8")
      .split("\n");
    const verify = words.includes(this.originalInputedWord);
    if (!verify) {
      throw new Error("Invalid word");
    }
    return this;
  }

  private verifyRepeatedTry(): this {
    if (this.tried.includes(this.originalInputedWord)) {
      throw new Error("Word already tried");
    }
    return this;
  }

  private verifyTries(): this {
    if (this.tried.length >= 6) {
      throw new Error("Try tomorrow");
    }
    return this;
  }
}

const app = new App();
const testes = (word: string) => {
  app.execute(word);
  console.log(app.tried.length);
  console.log("=======");
};

testes("teste");
