import { GameWord } from "./GameWord.js";
import { wordsList } from "./wordsList.js"
import { virtualKeys } from "./virtualKeys.js"
import { ignorableKeys } from "./ignorableKeys.js";

const startBtn = document.querySelector("#start-game");
const gameMenu = document.querySelector("#menu");
const menuTitle = document.querySelector("#menu-title");

let currGame = {};
let fails = 0;

function getValue(input) {
  return input.value;
}

function getRandomIndex(item) {
  return Math.floor(Math.random() * item.length);
}

function getRandomList(list) {
  return list[getRandomIndex(list)];
}

function adjustCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  let canvasSize = 320;

  if (window.innerWidth < 348) {
    canvasSize = 200;
  }
  canvas.style.width = `${canvasSize}px`;
  canvas.style.height = `${canvasSize}px`;
  const scale = window.devicePixelRatio;
  canvas.width = Math.floor(canvasSize * scale);
  canvas.height = Math.floor(canvasSize * scale);
  ctx.scale(scale, scale);
}

function clearContent(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function testKey(evt) {
  const lettersOnly = /^[a-z]|['ç']/g;

  return lettersOnly.test(evt);
}

function getVirtualKeys(evt) {
  const failsInput = document.querySelector("#attempts-input");
  const lettersPanel = document.querySelector("#letters-panel");
  const panels = lettersPanel.childNodes;
  const virtualKeyboard = document.querySelector(".virtual-keyboard");

  if (evt.target.parentNode === virtualKeyboard) {
    if (checkVirtualKey(evt.target, currGame.word)) {
      fillInput(getValue(evt.target), failsInput);
      addFailCount();
      drawGallow(fails);
    } else {
      fillPanel(currGame.word, getValue(evt.target), panels);
      checkPanel(evt.target, panels)
    }
  }
}

function checkVirtualKey(evt, word) {
  return !compareKey(word, getValue(evt));
}

function compareKey(word, key) {
  return word.includes(key);
}

function generateGameWord() {
  const randomTag = getRandomList(wordsList);
  const index = getRandomIndex(randomTag.items);
  return new GameWord(randomTag.items[index], randomTag.category);
}

function generateCanvas() {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "gallow-panel");
  adjustCanvas(canvas);
  return canvas;
}

function generateCategory(game) {
  const categoryTag = document.createElement('h2');
  categoryTag.classList.add("category-tag");
  categoryTag.textContent  = `A dica é: ${game.category}`;
  return categoryTag;
}

function generatePanel(game) {
  const gamePanel = document.createElement("ul");
  gamePanel.setAttribute("id", "letters-panel");

  for (let letter of game.word) {
    let li = document.createElement("li");

    if (letter === " ") {
      li.setAttribute("class", "letter-item");
      li.classList.add("blank-item");
    } else {
      li.setAttribute("class", "letter-item");
    }

    addElement(li, gamePanel);
  }

  return gamePanel;
}

function generateInput() {
  const attemptsInput = document.createElement("input");
  attemptsInput.setAttribute("id", "attempts-input");
  attemptsInput.setAttribute("type", "text");
  return attemptsInput;
}

function generateKeyboard() {
  const virtualKeyboard = document.createElement("div");
  virtualKeyboard.classList.add("virtual-keyboard");

  for (let key of virtualKeys) {
    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.classList.add("virtual-key");
    btn.value = key.toLowerCase();
    btn.textContent = key;

    virtualKeyboard.appendChild(btn);

    if (key === "P" || key === "Ç") {
      let br = document.createElement("br");
      virtualKeyboard.appendChild(br);
    }
  }

  return virtualKeyboard;
}

function generateUI(word) {
  const wordPanel = document.querySelector("#word-panel");

  addElement(generateCategory(word), wordPanel);
  addElement(generateCanvas(), wordPanel);
  addElement(generateInput(), wordPanel);
  addElement(generatePanel(word), wordPanel);
  addElement(generateKeyboard(), wordPanel);

  showElement(wordPanel);
}

function removeUI() {
  const wordPanel = document.querySelector("#word-panel");

  hideElement(wordPanel);
  setTimeout(clearContent(wordPanel), 1000);
}

function getKeys(evt) {
  const failsInput = document.querySelector("#attempts-input");
  const lettersPanel = document.querySelector("#letters-panel");
  const panels = lettersPanel.childNodes;

  if (catchIgnorableKeys(evt)) {
    return;
  }

  if (catchWrongKey(evt, currGame.word)) {
    fillInput(evt.key, failsInput);
    addFailCount();
    drawGallow(fails);
  } else {
    fillPanel(currGame.word, evt.key, panels);
    checkPanel(evt, panels);
  }
}

function drawGallow(fails) {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  let canvasWidth = canvas.width;
  let startX = canvasWidth / 2;

  switch (fails) {
    case 1:
      drawCircle(startX, 50, 30, "black", ctx);
      break;

    case 2:
      drawLine(startX, 1, 80, 2, "black", ctx);
      break;

    case 3:
      drawLine(startX, 1.3, 90, 2, "black", ctx);
      break;

    case 4:
      drawLine(startX, 0.7, 90, 2, "black", ctx);
      break;

    case 5:
      drawLine(startX, 1.2, 160, 1.6, "black", ctx);
      break;

    case 6:
      drawLine(startX, 0.8, 160, 1.6, "black", ctx);
      break;
  }
}

function drawCircle(x, y, radius, color, ctx) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.stroke();
}

function drawLine(x, angle, y, length, color, ctx) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x * angle, y * length);
  ctx.closePath();
  ctx.stroke();
}

function fillPanel(word, evt, panels) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === evt) {
      panels[i].textContent = evt;
      expandPanel(panels[i]);
    }
  }
}

function fillInput(ref, input) {
  if (compareKey(input.value, ref)) {
    return;
  } else {
    input.value += `${ref} `;
  }
}

function catchWrongKey(evt, word) {
  if (testKey(evt.key)) {
    return !compareKey(word, evt.key);
  }
}

function catchIgnorableKeys(evt) {
  for (let key of ignorableKeys) {
    if (evt.keyCode === key) {
      return true;
    } else {
      continue;
    }
  }
}

function startGame() {
  fails = 0;
  console.log(fails);
  hideElement(gameMenu);
  currGame = generateGameWord();

  generateUI(currGame);
  document.addEventListener("keydown", getKeys);
  document.addEventListener("click", getVirtualKeys);
}

function addFailCount() {
  fails++;

  if (fails === 6) {
    setTimeout(() => {
      displayDefeat();
      stopGame();
    }, 500);

    return;
  }
}

function checkPanel(evt, panels) {
  if (testKey(evt.key) || getValue(evt)) {
    for (let i = 0; i < currGame.word.length; i++) {
      if (panels[i].classList.contains("blank-item")) {
        continue;
      }

      if (panels[i].textContent !== "") {
        continue;
      } else {
        return;
      }
    }
  }

  setTimeout(() => {
    displayVictory();
    stopGame();
  }, 500);
}

function expandPanel(panels) {
  if (panels.classList.contains("filled")) {
    return;
  } else {
    panels.classList.add("filled");
  }
}

function hideElement(target) {
  if (target.classList.contains("shown-box")) {
    target.classList.remove("shown-box");
  }

  target.classList.add("hidden-box");
  disableElement(startBtn);
}

function showElement(target) {
  if (target.classList.contains("hidden-box")) {
    target.classList.remove("hidden-box");
  }

  target.classList.add("shown-box");
  enableElement(startBtn);
}

function enableElement(target) {
  if (target.getAttribute("disabled") !== "") {
    target.removeAttribute("disabled");
  }
}

function disableElement(target) {
  if (target.getAttribute("disabled" === "")) {
    target.setAttribute("disabled", "");
  }
}

function displayVictory() {
  showElement(gameMenu);
  menuTitle.textContent = "Você Venceu. Parabéns!";
}

function displayDefeat() {
  showElement(gameMenu);
  menuTitle.textContent = `
Você Perdeu.

A palavra correta era: ${currGame.word}!
`;
}

function stopGame() {
  document.removeEventListener("keydown", getKeys);
  document.removeEventListener("click", getVirtualKeys);
  
  removeUI();
}

function addElement(element, target) {
  target.appendChild(element);
}

startBtn.addEventListener("click", startGame);
