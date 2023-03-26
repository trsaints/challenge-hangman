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
    const article = new DOMElement("article", ["word__info"]);
    const h4 = new DOMElement("h4", ["info__name"]);
    const p = new DOMElement("p", ["info__category"]);

    h4.textContent = `Palavra: ${name}`;
    p.textContent = `Categoria: ${category}`;

    article.appendChild(h4);
    article.appendChild(p);

    return article;
  }

  #generateOptions(id) {
    const menu = new DOMElement("menu", ["word__options"]);
    const editBtn = new DOMElement("button", ["options__edit"]);
    const deleteBtn = new DOMElement("button", ["options__delete"]);

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

    menu.setAttribute("id", id.replaceAll(" ", "-"));
    editBtn.setAttribute("data-element", "modify");
    deleteBtn.setAttribute("data-element", "remove");

    menu.appendChild(editBtn);
    menu.appendChild(deleteBtn);

    return menu;
  }

  constructor({ name, category }) {
    return this.#generate(name, category);
  }
}
