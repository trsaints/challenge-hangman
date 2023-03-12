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
      const virtualKey = this.#generateKey(key);
      virtualKey.setAttribute("type", "button");

      virtualKeyboard.appendChild(virtualKey);

      if (lineBreakDelimiter.test(key))
        virtualKeyboard.appendChild(new DOMElement("br"));
    });

    return virtualKeyboard;
  }

  #generateKey(key) {
    const virtualKey = new DOMElement("button", ["keyboard__key"]);
    virtualKey.textContent = key;
    virtualKey.setAttribute("value", key);
    virtualKey.setAttribute("data-element", "game-key");

    return virtualKey;
  }

  #generateCanvas() {
    const canvas = new DOMElement("canvas", ["game__panel"]);
    canvas.setAttribute("data-element", "game-canvas");

    return canvas;
  }

  #generateAttemptsPanel() {
    const panel = new DOMElement("output", ["game__attempts"]);
    panel.setAttribute("data-element", "game-attempts");

    return panel;
  }

  #generateWordPanel(word) {
    const panel = new DOMElement("p", ["game__word"]);
    const letters = word.split("");

    letters.forEach((letter) => {
      const span = new DOMElement("span", ["word__letter"]);

      if (letter === " ") {
        const blankSpan = new DOMElement("span", ["break"]);
        blankSpan.setAttribute("aria-hidden", true);
        panel.appendChild(blankSpan);
      } else panel.appendChild(span);

      span.setAttribute("data-element", "game-letter");
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
