export async function getRandomWord(database) {
  const words = await database.loadAll("words");
  const randomIndex = Math.floor(Math.random() * words.length);

  return words[randomIndex];
}

export function setValidKeys(keyRange) {
  let filteredKeyRange = keyRange.map(({ key }) => key);
  localStorage.setItem("filteredKeys", JSON.stringify(filteredKeyRange));
}

export function getValidKeys() {
  return JSON.parse(localStorage.getItem("filteredKeys"));
}

export function observe(game) {
  if (game.missingLetters.length === 0) game.win = true;

  if (game.attempts === 0) game.lose = true;

  if (game.win || game.lose) return game;
}

function getKey(key, target) {
  const keyRange = getValidKeys();

  let finalTarget = null;
  const virtualKey = target.closest("[data-element='game-key']");

  if (key) finalTarget = key.toUpperCase();
  else if (virtualKey) finalTarget = virtualKey.value;

  const validKeyRange = keyRange.includes(finalTarget);

  if (validKeyRange) return finalTarget;
}

function executeAttempt(callbacks, keyPressed, game) {
  callbacks.fillPanel(callbacks, keyPressed);

  if (game.cleanName.includes(keyPressed)) {
    game.removeLetter(keyPressed);
    callbacks.fillLetters(callbacks, keyPressed, game);
  } else {
    game.decreaseAttempts();
    callbacks.drawFail(callbacks, game.attempts);
  }
}

export async function startGame(callbacks, components, database) {
  const game = new components.Game(await getRandomWord(database));

  const play = ({ key, target }) => {
    const keyPressed = getKey(key, target);

    if (!keyPressed) return;

    executeAttempt(callbacks, keyPressed, game);

    const status = observe(game);

    if (status) {
      document.removeEventListener("keydown", play);
      document.removeEventListener("click", play);
      setTimeout(() => callbacks.end({ callbacks, game }), 500);
    }
  };

  callbacks.start({ callbacks, components, game });

  document.addEventListener("keydown", play);
  document.addEventListener("click", play);
}
