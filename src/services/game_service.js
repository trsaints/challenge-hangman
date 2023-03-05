export async function getRandomWord(database) {
  const words = await database.loadAll("words");
  const randomIndex = Math.floor(Math.random() * words.length);

  return words[randomIndex];
}

export function listenKeyRange({ key, keyRange }) {
  return keyRange.includes(key);
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

export async function startGame(callbacks, components, database ) {
  const word = await getRandomWord(database);
  const game = new components.Game(word);
  const keyRange = [];

  console.table(word)

  await database
    .loadAll("accteptableKeys")
    .then((result) => result.map(({ key }) => keyRange.push(key)));

  const play = ({ key }) => {
    const invalidKeyRange = !listenKeyRange({ key, keyRange });

    if (invalidKeyRange) return;

    if (word.name.includes(key)) game.removeLetter(key);
    else game.decreaseAttempts();

    const status = observe(game);

    if (status) {
      callbacks.end({ callbacks, game, word });
      document.removeEventListener("keydown", play);
    }
  };

  callbacks.start({ callbacks, components, game });

  document.addEventListener("keydown", play);

}