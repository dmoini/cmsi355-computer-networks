/* eslint-disable no-console */
/*
 * Server side game module. Maintains the game state and processes all the messages from clients.
 *
 * Exports:
 *   - addPlayer(name)
 *   - move(direction, name)
 *   - state()
 */

const { randomPoint, permutation, clamp } = require("./gameutils");

const WIDTH = 640;
const HEIGHT = 640;
const MAX_PLAYER_NAME_LENGTH = 32;
const RADIUS = 10;
// const NUM_COINS = 100;


const database = {
  usednames: new Set(),
  scores: {},
  health: {},
  // coins: {},
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
    (database.usednames.has(name))
  ) {
    return false;
  }
  database.usednames.add(name);
  database[`player:${name}`] = randomPoint(WIDTH, HEIGHT).toString();
  database.scores[name] = 0;
  console.log("addPlayer:", database);
  return true;
};

// TODO
exports.addZombie = (name) => {
  database[`zombie:${name}`] = randomPoint(WIDTH, HEIGHT).toString();
  console.log("addZombie:", database)
}

// TODO: delete when done. Only here for testing
exports.getUsedNames = () => {
  return database.usednames;
}

// function placeCoins() {
//   permutation(WIDTH * HEIGHT)
//     .slice(0, NUM_COINS)
//     .forEach((position, i) => {
//       const coinValue = i < 50 ? 1 : i < 75 ? 2 : i < 95 ? 5 : 10;
//       const index = `${Math.floor(position / WIDTH)},${Math.floor(
//         position % WIDTH
//       )}`;
//       database.coins[index] = coinValue;
//     });
// }

// Return only the parts of the database relevant to the client. The client only cares about
// the positions of each player, the scores, and the positions (and values) of each coin.
// Note that we return the scores in sorted order, so the client just has to iteratively
// walk through an array of name-score pairs and render them.
exports.state = () => {
  // TODO: add key.startswith zombie: ???
  const positions = Object.entries(database)
    .filter(([key]) => (key.startsWith("player:") || key.startsWith("zombie:")))
    .map(([key, value]) => [key.substring(7), value]);
  console.log(`POSITIONS: ${JSON.stringify(positions)}`);
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

const inBounds = (x, y) => {
  return x <= WIDTH - radius && x >= radius && y <= HEIGHT - radius && y >= radius;
}

const calculateDistance = (x1, y1, x2, y2) => {
  return Math.hypot(x2 - x1, y2 - y1);
}

const findNearestPlayer = (x, y, gameState) => {
  const players = gameState.positions.filter(data => !data[0].startsWith("zombie"));
  let nearestPlayer = "";
  players.forEach(p => {
    const [px, py] = p[1].split(",").map(n => +n);
    const distance = Math.hypot(px - x, py - y);
    
  })
  return nearestPlayer;
}

exports.updateZombies = (gameState) => {
  // const players = gameState.positions.filter(data => !data[0].startsWith("zombie"));
  const zombies = gameState.positions.filter(data => data[0].startsWith("zombie"));
  console.log("ZOMBIES", zombies);
  zombies.forEach(z => {
    const zombieKey = `zombie:${z[0]}`;
    const [zx, zy] = database[zombieKey].split(",").map(n => +n);
    const nearestPlayer = findNearestPlayer(zx, zy, gameState);
    if (nearestPlayer === "") {
      return;
    }


    
    
    
    
    
    
    
    
    // const zombieKey = `zombie:${z[0]}`;
    // console.log("ZOMBIE KEY:", zombieKey);
    // const [zx, zy] = z[1].split(",");
    // let [closestPX, closestPY] = [null, null];
    // let shortestDistance = Number.POSITIVE_INFINITY;
    // players.forEach(p => {
    //   const [px, py] = p[1].split(",");
    //   const [dx, dy] = [zx - px, zy - py];
    //   const distance = Math.hypot(dx, dy);
    //   if (distance < shortestDistance) {
    //     [closestPX, closestPY] = [px, py];
    //     shortestDistance = distance;
    //   }
    // });
    // // console.log(ß)
    // let [newZX, newZY] = [(newPx - zx), (newPy - zy)];
    // // newZX += newPx /40;
    // console.log(newZX, newZY);
    // // if (inBounds(newZX, newZY)) {
    // database[zombieKey] = `${newZX},${newZY}`;
    // // }
  });
};

// placeCoins();
