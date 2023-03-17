import DOMElement from "./DOMElement.js";
import Icon from "./Icon.js";

export default class EditorWord {
  #generate(name, category) {
    const li = new DOMElement("li", ["list__word"]);
    const content = this.#generateInfo(name, category);
    const options = this.#generateOptions(name);

    li.appendChild(content);
    li.appendChild(options);

    return li;
  }

  #generateInfo(name, category) {
    const frag = document.createDocumentFragment();
    const h4 = new DOMElement("h4", ["word__name"]);
    const p = new DOMElement("p", ["word__category"]);

    h4.textContent = `Palavra: ${name}`;
    p.textContent = `Categoria: ${category}`;

    frag.appendChild(h4);
    frag.appendChild(p);

    return frag;
  }

  #generateOptions(id) {
    const menu = new DOMElement("menu");
    const editBtn = new DOMElement("button");
    const deleteBtn = new DOMElement("button");

    const editSpan = new DOMElement("span", ["sr-only"]);
    editSpan.textContent = "Editar Palavra";

    const deleteSpan = new DOMElement("span", ["sr-only"]);
    deleteSpan.textContent = "Excluir Palavra";

    const editIcon = new Icon("pencil");
    const deleteIcon = new Icon("trash-can");

    editBtn.appendChild(editSpan);
    editBtn.appendChild(editIcon);

    deleteBtn.appendChild(deleteSpan);
    deleteBtn.appendChild(deleteIcon);

    menu.setAttribute("id", id);
    editBtn.setAttribute("data-element", "edit");
    deleteBtn.setAttribute("data-element", "delete");

    menu.appendChild(editBtn);
    menu.appendChild(deleteBtn);

    return menu;
  }

  constructor({ name, category }) {
    return this.#generate(name, category);
  }
}
