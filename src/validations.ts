import { IValidations } from "./interface/validations.interface";

export class Validation implements IValidations {
  constructor(private wordsList: string[]) {}
  tried: string[] = [];
  originalInputedWord: string;

  execute(): this {
    this.verifyTries().verifyRepeatedTry().validateLength().updateTries();
    return this;
  }

  private updateTries() {
    this.tried.push(this.originalInputedWord);
  }

  protected verifyTries(): this {
    if (this.tried.length >= 6) {
      throw new Error("Try tomorrow");
    }
    return this;
  }

  protected verifyRepeatedTry(): this {
    if (this.tried.includes(this.originalInputedWord)) {
      throw new Error("Word already tried");
    }
    return this;
  }

  protected validateLength(): this {
    if (this.originalInputedWord.length !== 5) {
      throw new Error("Incorrect Length");
    }
    return this;
  }

  protected verifyWord(): this {
    const verify = this.wordsList.includes(this.originalInputedWord);
    if (!verify) {
      throw new Error("Invalid word");
    }
    return this;
  }
}
