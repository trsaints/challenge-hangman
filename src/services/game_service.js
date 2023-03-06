export async function getRandomWord(database) {
  const words = await database.loadAll("words");
  const randomIndex = Math.floor(Math.random() * words.length);

  return words[randomIndex];
}

export function setValidKeys(keyRange) {
  let filteredKeyRange = keyRange.map(({ key }) => key);
  localStorage.setItem("filteredKeys", JSON.stringify(filteredKeyRange));
}

function getValidKeys() {
  return JSON.parse(localStorage.getItem("filteredKeys"));
}

export function observe(game) {
  if (game.name.length === 0) {
    game.win = true;
  }

  if (game.attempts === 0) {
    game.lose = true;
  }

  if (game.win || game.lose) return game;
}

export async function startGame(callbacks, components, database) {
  const word = await getRandomWord(database);
  const game = new components.Game(word);
  const keyRange = getValidKeys()

  console.table(word);
  console.log(keyRange)

  const play = ({ key, target }) => {
    let finalTarget = null;
    const virtualKey = target.closest("[data-element='key']");

    if (key) finalTarget = key.toUpperCase();
    else if (virtualKey) finalTarget = virtualKey.value;

    const invalidKeyRange = !keyRange.includes(finalTarget);

    if (invalidKeyRange) return;

    if (word.name.includes(finalTarget)) game.removeLetter(finalTarget);
    else game.decreaseAttempts();

    const status = observe(game);

    if (status) {
      callbacks.end({ callbacks, game, word });
      document.removeEventListener("keydown", play);
      document.removeEventListener("click", play);
    }
  };

  callbacks.start({ callbacks, components, game });

  document.addEventListener("keydown", play);
  document.addEventListener("click", play);
}
