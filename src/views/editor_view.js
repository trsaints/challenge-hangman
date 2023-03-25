const validations = ["valueMissing", "patternMismatch", "tooLong", "tooShort"],
  messages = {
    valueMissing: "Este campo é obrigatório.",
    patternMismatch: "Este campo deve ter: \n Somente letras",
    tooLong: "Insira no máximo 24 caracteres",
    tooShort: "Insira, no mínimo, 3 caracteres",
  };

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

  const form = callbacks.getElement("editor-form"),
    editorDB = callbacks.getElement("editor-database"),
    wordListing = callbacks.getElement("listing");

  await database
    .loadAll("words")
    .then((words) =>
      words.forEach((word) => frag.appendChild(new components.EditorWord(word)))
    );

  wordListing.appendChild(frag);

  callbacks.hideElement(form);
  callbacks.showElement(editorDB);
}

export async function displayConfirmation({ target, callbacks, database }) {
  const id = target.parentNode.getAttribute("id");

  const modal = callbacks.getElement("editor-modal");
  const modalTitle = callbacks.getElement("modal-action");
  const modalDesc = callbacks.getElement("modal-desc");

  const { name, category } = await database.load(
    "words",
    id.replaceAll("-", " ")
  );

  modalTitle.textContent = "Excluir Palavra";
  modalDesc.textContent = `Deseja excluir ${name}? Categoria: ${category}`;

  modal.setAttribute("data-word", id);

  callbacks.showElement(modal);
  modal.showModal();
}

export async function confirmAction({ callbacks, database }) {
  const modal = callbacks.getElement("editor-modal");
  const id = modal.getAttribute("data-word");

  const { parentNode } = document.querySelector(`#${id}`);

  await database.removeObject("words", id.replaceAll("-", " "));

  modal.close();
  callbacks.hideElement(modal);
  callbacks.showPopup("Item excluído com sucesso!");

  parentNode.remove();
}

export function cancelAction({ callbacks }) {
  const modal = callbacks.getElement("editor-modal");

  modal.close();
  callbacks.hideElement(modal);
}

function checkValidity(input) {
  return input.validity.valid;
}

function validate(input) {
  validations.forEach((validation) => {
    if (input.validity[validation]) {
      input.reportValidity();
      input.setCustomValidity(messages[validation]);
    } else input.setCustomValidity("");
  });
}

export function setValidation({ callbacks, database }) {
  const form = callbacks.getElement("editor-form"),
    { elements } = form,
    wordInput = elements["game-word"],
    categoryInput = elements["category"];

  form.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const notValid = !(
      checkValidity(wordInput) && checkValidity(categoryInput)
    );

    if (notValid) return;

    await addWord({ callbacks, database });

    callbacks.showPopup("Item adicionado com sucesso!");

    form.reset();
  });

  wordInput.addEventListener("input", () => validate(wordInput));
  wordInput.addEventListener("focusout", () => validate(wordInput));

  categoryInput.addEventListener("input", () => validate(categoryInput));
  categoryInput.addEventListener("focusout", () => validate(categoryInput));
}

async function addWord({ callbacks, database }) {
  const { elements } = callbacks.getElement("editor-form");

  await database.addObject("words", {
    name: elements["game-word"].value.toUpperCase(),
    category: elements["category"].value.toUpperCase(),
  });
}
