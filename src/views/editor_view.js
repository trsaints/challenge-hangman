export function showEditor({ callbacks }) {
  const editor = callbacks.getElement("editor");
  const mainMenu = callbacks.getElement("menu");

  callbacks.hideElement(mainMenu);
  callbacks.showElement(editor);
}

export function showForm({ callbacks }) {
  const form = callbacks.getElement("editor-form");
  const editorDB = callbacks.getElement("editor-database");

  callbacks.hideElement(editorDB);
  callbacks.showElement(form);
}

export async function displayWords({ callbacks, components, database }) {
  const frag = document.createDocumentFragment();
  const form = callbacks.getElement("editor-form");
  const editorDB = callbacks.getElement("editor-database");

  await database
    .loadAll("words")
    .then((words) =>
      words.forEach((word) => frag.appendChild(new components.EditorWord(word)))
    );

  editorDB.appendChild(frag);

  callbacks.hideElement(form);
  callbacks.showElement(editorDB);
}

export async function displayConfirmation({ target, callbacks, database }) {
  const id = target.parentNode.getAttribute("id");

  const modal = callbacks.getElement("editor-modal");
  const modalTitle = callbacks.getElement("modal-action");
  const modalDesc = callbacks.getElement("modal-desc");

  const { name, category } = await database.load("words", id);

  modalTitle.textContent = "Excluir Palavra";
  modalDesc.textContent = `Deseja excluir ${name}? Categoria: ${category}`;

  modal.setAttribute("data-word", id);

  callbacks.showElement(modal);
  modal.show();
}

export async function confirmAction({ callbacks, database }) {
  const modal = callbacks.getElement("editor-modal");
  const id = modal.getAttribute("data-word");

  const { parentNode } = document.querySelector(`#${id}`);

  await database.removeObject("words", id);

  modal.close();
  callbacks.hideElement(modal);

  parentNode.remove();
}

export function cancelAction({ callbacks }) {
  const modal = callbacks.getElement("editor-modal");

  modal.close();
  callbacks.hideElement(modal);
}

export async function addWord({ callbacks, database }) {

  const { elements } = callbacks.getElement("editor-form");

  await database.addObject('words', {
    name: elements['game-word'].value,
    category: elements['category'].value
  })
}
