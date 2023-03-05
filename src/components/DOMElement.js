export default class DOMElement {
  #generate(element, selectors = []) {
    const component = document.createElement(element);

    if (selectors.length > 0)
      selectors.forEach((selector) => component.classList.add(selector));

    return component;
  }

  constructor(element, selectors) {
    return this.#generate(element, selectors);
  }
}
