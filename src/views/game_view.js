function render(callbacks, components, game) {
  const panel = callbacks.getElement("game");
  const menu = callbacks.getElement("menu");

  callbacks.clearContent(panel);
  callbacks.showElement(panel);
  callbacks.hideElement(menu);

  panel.appendChild(new components.GamePanel(game));
}

export function start({ callbacks, components, game }) {
  render(callbacks, components, game);
}

export function end({ callbacks, game, word }) {
  const panel = callbacks.getElement("game");
  const menu = callbacks.getElement("menu");
  const menuTitle = callbacks.getElement("menu-title");
  let message = "";

  callbacks.clearContent(panel);
  callbacks.showElement(menu);
  callbacks.hideElement(panel);

  if (game.win) message = "Você venceu!";
  if (game.lose) message = `Você perdeu: a palavra era ${word.name}`;

  menuTitle.textContent = message;
}
