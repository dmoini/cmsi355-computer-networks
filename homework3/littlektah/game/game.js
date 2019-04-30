/* eslint-disable no-console */
/*
 * Server side game module. Maintains the game state and processes all the messages from clients.
 *
 * Exports:
 *   - addPlayer(name)
 *   - move(direction, name)
 *   - state()
 */

const { randomPoint, outOfBounds } = require("./gameutils");

const WIDTH = 640;
const HEIGHT = 640;
const MAX_PLAYER_NAME_LENGTH = 32;
const RADIUS = 10;
const STARTING_HEALTH = 20;

const database = {
  usednames: new Set(),
  scores: {},
  health: {},
  dead: new Set(),
  id: {},
};

exports.addPlayer = (name, socket) => {
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
  database.health[name] = STARTING_HEALTH;
  database.id[name] = socket.id;
  return true;
};

exports.addZombie = name => {
  database[`zombie:${name}`] = randomPoint(WIDTH, HEIGHT).toString();
};

// TODO: delete when done. Only here for testing
exports.getUsedNames = () => {
  return database.usednames;
};

exports.state = () => {
  const positions = Object.entries(database)
    .filter(([key]) => key.startsWith("player:") || key.startsWith("zombie:"))
    .map(([key, value]) => [key.substring(7), value]);
  const scores = Object.entries(database.scores);
  scores.sort(([, v1], [, v2]) => v2 - v1);
  return {
    positions,
    scores,
  };
};

exports.move = (direction, name) => {
  if (direction) {
    const playerKey = `player:${name}`;
    if (database[playerKey]) {
      const [newX, newY] = direction
        .substring(1, direction.length - 1)
        .split(",");
      database[playerKey] = `${newX},${newY}`;
    }
  }
};

const findNearestPlayer = (x, y, gameState) => {
  let nearestDistance = Number.POSITIVE_INFINITY;
  let nearestPlayer = "";

  const players = gameState.positions.filter(
    data => !data[0].startsWith("zombie")
  );
  players.forEach(p => {
    const [px, py] = p[1].split(",").map(n => +n);
    const distance = Math.hypot(px - x, py - y);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestPlayer = p[0];
    }
  });
  return nearestPlayer;
};

function pushOffIfNecessary(z1, z2) {
  let [zx1, zy1] = database[z1].split(",").map(n => +n);
  let [zx2, zy2] = database[z2].split(",").map(n => +n);

  let [dx, dy] = [zx2 - zx1, zy2 - zy1];
  const distance = Math.hypot(dx, dy);
  let overlap = RADIUS * 2 - distance;
  let contact = false;
  if (overlap > 0) {
    contact = true;
    const adjustX = (overlap / 2) * (dx / distance);
    const adjustY = (overlap / 2) * (dy / distance);
    zx1 -= adjustX;
    zy1 -= adjustY;
    zx2 += adjustX;
    zy2 += adjustY;
  }
  if (outOfBounds(zx1, zx2, zy1, zy2, HEIGHT, WIDTH, RADIUS)) {
    database[z1] = `${zx1},${zy1}`;
    database[z2] = `${zx2},${zy2}`;
  }
  return z1.startsWith("player") && contact;
}

exports.updateZombies = gameState => {
  const zombies = gameState.positions.filter(data =>
    data[0].startsWith("zombie")
  );
  const players = gameState.positions.filter(
    data => !data[0].startsWith("zombie")
  );
  zombies.forEach(z => {
    const zombieKey = `zombie:${z[0]}`;
    const [zx, zy] = database[zombieKey].split(",").map(n => +n);
    const nearestPlayer = findNearestPlayer(zx, zy, gameState);
    if (nearestPlayer === "") {
      return;
    }
    const [px, py] = database[`player:${nearestPlayer}`]
      .split(",")
      .map(n => +n);
    let [newZX, newZY] = [zx - (zx - px) / 20, zy - (zy - py) / 20];
    zombies
      .filter(data => data[0].substring(0, 14) !== `${z[0]}`)
      .forEach(z1 => {
        pushOffIfNecessary(`zombie:${z[0]}`, `zombie:${z1[0]}`);
      });
    players.forEach(p => {
      if (pushOffIfNecessary(`player:${p[0]}`, `zombie:${z[0]}`)) {
        database.health[`${p[0]}`]--;
        if (database.health[`${p[0]}`] <= 0) {
          database.dead.add(`${p[0]}`);
        }
      }
    });
    database[zombieKey] = `${newZX},${newZY}`;
  });
};

exports.checkIfDead = () => {
  let socketIDs = new Set();
  database.dead.forEach(p => {
    socketIDs.add(database.id[p]);
    database.usednames.delete(p);
    delete database[`player:${p}`];
    delete database.health[p];
    delete database.scores[p];
    database.dead.delete(p);
    delete database.id[p];
  });
  return socketIDs;
};

exports.updateScores = () => {
  const players = Object.entries(database).filter(
    data =>
      !(data[0] instanceof Object || data[0] instanceof Set) &&
      data[0].startsWith("player")
  );
  players.forEach(p => {
    database.scores[p[0].substring(7)] += 1;
  });
};