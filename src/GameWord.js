export class GameWord {
  #word;
  #category;

  constructor(word, category) {
    this.#word = word;
    this.#category = category;
  }

  get word() {
    return this.#word;
  }

  get category() {
    return this.#category;
  }
}
