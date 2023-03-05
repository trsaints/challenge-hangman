export default function initialize({ callbacks, components, database }) {
  if (!database.checkPreload()) callbacks.configureDB();

  const startButton = callbacks.getElement("start-game");
  const editButton = callbacks.getElement("edit-game");

  startButton.addEventListener(
    "click",
    async () => await callbacks.startGame(callbacks, components, database)
  );
}
