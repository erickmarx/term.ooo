import fs from "fs";

export const ReadWordList = (): string[] =>
  fs
    .readFileSync("./src/word-file/words-with-5-letters.txt", "utf-8")
    .split("\n");
