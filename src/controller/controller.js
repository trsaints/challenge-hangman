export default async function initialize({ callbacks, components, database }) {
  if (!database.checkPreload()) callbacks.configureDB();

  const actions = {
    start: async () =>
      await callbacks.startGame(callbacks, components, database),
    edit: () => callbacks.showEditor({ callbacks }),
    add: () => callbacks.showForm({ callbacks }),
    list: () => callbacks.displayWords({ callbacks, components, database }),
    modify: () => {},
    remove: async (target) =>
      await callbacks.displayConfirmation({ target, callbacks, database }),
    confirm: async () => await callbacks.confirmAction({ callbacks, database }),
    cancel: () => callbacks.cancelAction({ callbacks }),
  };

  const keyRange = await database.loadAll("accteptableKeys");

  callbacks.setValidKeys(keyRange);
  callbacks.setValidation({ callbacks, database });

  document.addEventListener("click", ({ target }) => {
    const { element } = target.dataset;

    if (!actions[element]) return;

    actions[element](target);
  });

  callbacks
    .getElement("editor-modal")
    .addEventListener("keydown", ({ key }) => {
      if (key === "Escape") actions.cancel();
    });
}
