export default class Game {
  #name = "";
  #cleanName = "";
  missingLetters = "";
  #category = "";
  attempts = 6;
  win = false;
  lose = false;
  #replaceableLetters = {
    Á: "A",
    À: "A",
    Â: "A",
    Ã: "A",
    Ä: "A",
    È: "E",
    É: "E",
    Ê: "E",
    Ẽ: "E",
    Ë: "E",
    Í: "I",
    Ì: "I",
    Î: "I",
    Ĩ: "I",
    Ï: "I",
    Ó: "O",
    Ò: "O",
    Ô: "O",
    Õ: "O",
    Ö: "O",
    Ú: "U",
    Ù: "U",
    Û: "U",
    Ũ: "U",
    Ü: "U",
  };

  #removeLetter(key) {
    this.missingLetters = this.missingLetters.replaceAll(key, "");
  }

  #decreaseAttempts() {
    this.attempts--;
  }

  #formatLetters(name) {
    const result = name.split("").map((letter) => {
      const replacedLetter = this.#replaceableLetters[letter];

      if (replacedLetter) return letter.replace(letter, replacedLetter);
      else return letter;
    });

    this.#cleanName = result.join("").replaceAll(" ", "");
    this.missingLetters = this.#cleanName;
  }

  get removeLetter() {
    return this.#removeLetter;
  }

  get decreaseAttempts() {
    return this.#decreaseAttempts;
  }

  get name() {
    return this.#name;
  }

  get cleanName() {
    return this.#cleanName;
  }

  get category() {
    return this.#category;
  }

  constructor({ name, category }) {
    this.#name = name;
    this.#category = category;

    this.#formatLetters(name);
  }
}
