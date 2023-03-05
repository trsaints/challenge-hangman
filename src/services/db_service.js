import LocalDB from "../models/LocalDB.js";

export const gameDB = new LocalDB({
  name: "hangman_online",
  objectStores: ["words", "accteptableKeys"],
});

async function preload() {
  const data = await fetch("./public/db/db.json");

  try {
    if (data.ok) return data.json();
  } catch (error) {
    throw new Error("Couldn't fetch data: ", error);
  }
}

const { game } = await preload();

const options = {
  flows: [
    {
      keyPath: "name",
      autoIncrement: false,
    },
    {
      keyPath: "key",
      autoIncrement: false,
    },
  ],
  baseData: game,
};

export function configureDB() {
  try {
    gameDB.configure(options);
  } catch (error) {
    console.error(error);
  }
}
