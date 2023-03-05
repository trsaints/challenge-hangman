export default class Game {
  name = "";
  category = "";
  attempts = 6;
  active = true;
  win = false;
  lose = false;

  #removeLetter(key) {
    this.name = this.name.replaceAll(key, "");
  }

  #decreaseAttempts() {
    this.attempts--;
  }

  get removeLetter() {
    return this.#removeLetter;
  }

  get decreaseAttempts() {
    return this.#decreaseAttempts;
  }

  constructor({ name, category }) {
    this.name = name;
    this.category = category;
  }
}
