import EditorWord from "./components/EditorWord.js";
import GamePanel from "./components/GamePanel.js";
import initialize from "./controller/controller.js";
import Game from "./models/Game.js";
import {
  adjustCanvas,
  drawFail,
  drawGallow
} from "./services/canvas_service.js";
import { configureDB, gameDB } from "./services/db_service.js";
import {
  getRandomWord,
  setValidKeys,
  startGame
} from "./services/game_service.js";
import {
  clearContent,
  getElement,
  getElements,
  hideElement,
  showElement
} from "./views/dom_view.js";
import { addWord,showEditor, showForm, displayWords, displayConfirmation, confirmAction, cancelAction } from "./views/editor_view.js";
import { end, fillLetters, fillPanel, start } from "./views/game_view.js";


const dependencies = {
  callbacks: {
    addWord,
    adjustCanvas,
    displayWords,
    displayConfirmation,
    confirmAction,
    cancelAction,
    getElement,
    getElements,
    hideElement,
    showElement,
    clearContent,
    configureDB,
    fillLetters,
    fillPanel,
    getRandomWord,
    start,
    startGame,
    setValidKeys,
    end,
    drawFail,
    drawGallow,
    showEditor,
    showForm
  },
  components: {
    GamePanel,
    EditorWord,
    Game,
  },
  database: gameDB,
};

initialize(dependencies);
