import GamePanel from "./components/GamePanel.js";
import initialize from "./controller/controller.js";
import Game from "./models/Game.js";
import { configureDB, gameDB } from "./services/db_service.js";
import {
  getRandomWord,
  setValidKeys,
  startGame,
} from "./services/game_service.js";
import {
  clearContent,
  getElement,
  hideElement,
  showElement,
} from "./views/dom_view.js";
import { end, start } from "./views/game_view.js";

const dependencies = {
  callbacks: {
    getElement,
    hideElement,
    showElement,
    clearContent,
    configureDB,
    getRandomWord,
    start,
    startGame,
    setValidKeys,
    end,
  },
  components: {
    GamePanel,
    Game,
  },
  database: gameDB,
};

initialize(dependencies);
