export function getElement(element) {
  return document.querySelector(`[data-element="${element}"]`);
}
export function getElements(element) {
  return document.querySelectorAll(`[data-element="${element}"]`);
}

export function showElement(element) {
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");

    element.removeAttribute("aria-hidden");
  }
}

export function hideElement(element) {
  if (!element.classList.contains("hidden")) {
    element.classList.add("hidden");

    element.setAttribute("aria-hidden", true);
  }
}

export function clearContent(element) {
  while (element.firstChild) element.removeChild(element.firstChild);
}

export function showPopup(message) {
  const popup = getElement("popup");
  const warnMessage = getElement("warn-message");
  
  const reset = () => hideElement(popup)
  clearTimeout(reset);

  warnMessage.textContent = message;

  showElement(popup);

  setTimeout(reset, 3000);
}
