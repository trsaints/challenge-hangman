import DOMElement from "./DOMElement.js";

export default class GamePanel {
  #generate({ name, category }) {
    const frag = document.createDocumentFragment();

    frag.appendChild(this.#generateTip(category));
    frag.appendChild(this.#generateCanvas());
    frag.appendChild(this.#generateAttemptsPanel());
    frag.appendChild(this.#generateWordPanel(name));
    frag.appendChild(this.#generateKeyboard());

    return frag;
  }

  #generateKeyboard() {
    const keys = [
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "Ç",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
    ];

    const virtualKeyboard = new DOMElement("menu", ["game__keyboard"]);

    const lineBreakDelimiter = /P|Ç/g;

    keys.forEach((key) => {
      virtualKeyboard.appendChild(this.#generateKey(key));

      if (lineBreakDelimiter.test(key))
        virtualKeyboard.appendChild(new DOMElement("br"));
    });

    return virtualKeyboard;
  }

  #generateKey(key) {
    const virtualKey = new DOMElement("button", ["keyboard__key"]);
    virtualKey.textContent = key;
    virtualKey.setAttribute("value", key);

    return virtualKey;
  }

  #generateCanvas() {
    const canvas = new DOMElement("canvas", ["game__panel"]);

    return canvas;
  }

  #generateAttemptsPanel() {
    const panel = new DOMElement("output", ["game__attempts"]);

    return panel;
  }

  #generateWordPanel(word) {
    const panel = new DOMElement("p", ["game__word"]);
    const letters = word.split("");

    letters.forEach((letter) => {
      const span = new DOMElement("span", ["word__letter"]);

      if (letter === " ")
        panel.appendChild(new DOMElement("span", ["word__letter--blank"]));
      else {
        panel.appendChild(span);
      }
    });

    return panel;
  }

  #generateTip(category) {
    const tip = new DOMElement("p", ["game__tip"]);

    tip.textContent = `A dica é: ${category}`;

    return tip;
  }

  constructor(keys) {
    return this.#generate(keys);
  }
}
