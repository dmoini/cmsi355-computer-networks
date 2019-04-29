/* eslint-disable no-console */
/*
 * Server side game module. Maintains the game state and processes all the messages from clients.
 *
 * Exports:
 *   - addPlayer(name)
 *   - move(direction, name)
 *   - state()
 */

const { randomPoint, permutation } = require("./gameutils");

const WIDTH = 64;
const HEIGHT = 64;
const MAX_PLAYER_NAME_LENGTH = 32;
const NUM_COINS = 100;

const database = {
  scores: {},
  usednames: new Set(),
  coins: {},
};

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

exports.addPlayer = (name) => {
  if (
    name.length === 0 ||
    name.length > MAX_PLAYER_NAME_LENGTH ||
    database.usednames.has(name)
  ) {
    return false;
  }
  database.usednames.add(name);
  database[`player:${name}`] = randomPoint(WIDTH, HEIGHT).toString();
  database.scores[name] = 0;
  return true;
};

// TODO: delete when done. Only here for testing
exports.getUsedNames = () => {
  return database.usednames;
}

function placeCoins() {
  permutation(WIDTH * HEIGHT)
    .slice(0, NUM_COINS)
    .forEach((position, i) => {
      const coinValue = i < 50 ? 1 : i < 75 ? 2 : i < 95 ? 5 : 10;
      const index = `${Math.floor(position / WIDTH)},${Math.floor(
        position % WIDTH
      )}`;
      database.coins[index] = coinValue;
    });
}

// Return only the parts of the database relevant to the client. The client only cares about
// the positions of each player, the scores, and the positions (and values) of each coin.
// Note that we return the scores in sorted order, so the client just has to iteratively
// walk through an array of name-score pairs and render them.
exports.state = () => {
  const positions = Object.entries(database)
    .filter(([key]) => key.startsWith("player:"))
    .map(([key, value]) => [key.substring(7), value]);
  const scores = Object.entries(database.scores);
  scores.sort(([, v1], [, v2]) => v2 - v1);
  return {
    positions,
    scores,
    coins: database.coins,
  };
};

exports.move = (direction, name) => {
  if (direction) {
    const playerKey = `player:${name}`;
    // console.log(database);
    const [x, y] = database[playerKey].split(",");
    console.log("Old XY", [x, y]);
    console.log("direction", direction);
    const [newX, newY] = direction
      .substring(1, direction.length - 1)
      .split(",");
    console.log("NewXY:", [newX, newY]);
    database[playerKey] = `${newX},${newY}`;
    console.log("=========================================");
  }
};

placeCoins();
