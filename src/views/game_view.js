export function start({ callbacks, components, game }) {
  const panel = callbacks.getElement("game");
  const menu = callbacks.getElement("menu");

  callbacks.clearContent(panel);
  callbacks.showElement(panel);
  callbacks.hideElement(menu);

  panel.appendChild(new components.GamePanel(game));
  callbacks.adjustCanvas(callbacks);
  callbacks.drawGallow(callbacks);
}

export function fillPanel(callbacks, key) {
  const attemptsPanel = callbacks.getElement("game-attempts");
  const { textContent } = attemptsPanel;

  if (!textContent.includes(key)) attemptsPanel.textContent += key;
}

export function fillLetters(callbacks, key, game) {
  let { name, cleanName } = game;
  name = name.replaceAll(" ", "");

  const virtualLetters = callbacks.getElements("game-letter");

  for (let i in cleanName)
    if (cleanName[i] === key) {
      virtualLetters[i].textContent = name[i];
      virtualLetters[i].classList.add("active");
    }
}

export function end({ callbacks, game }) {
  const panel = callbacks.getElement("game");
  const menu = callbacks.getElement("menu");
  const menuTitle = callbacks.getElement("menu-title");
  let message = "";

  callbacks.clearContent(panel);
  callbacks.showElement(menu);
  callbacks.hideElement(panel);

  if (game.win) message = "Você venceu!";
  if (game.lose) message = `Você perdeu: a palavra era ${game.name}`;

  menuTitle.textContent = message;
}
