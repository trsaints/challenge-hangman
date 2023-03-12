export default async function initialize({ callbacks, components, database }) {
  if (!database.checkPreload()) callbacks.configureDB();

  const keyRange = await database.loadAll("accteptableKeys");

  callbacks.setValidKeys(keyRange)

  const startButton = callbacks.getElement("start-game");
  const editButton = callbacks.getElement("edit-game");

  startButton.addEventListener(
    "click",
    async () => await callbacks.startGame(callbacks, components, database)
  );
}
