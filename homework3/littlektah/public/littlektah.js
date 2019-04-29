(() => {
  const socket = io(); // eslint-disable-line no-undef
  const canvas = document.querySelector("canvas");
  const tableBody = document.querySelector("tbody");

  const ctx = canvas.getContext("2d");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  function clearCanvas() {
    ctx.clearRect(0, 0, 640, 640);
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function fillCell(row, column, text, textColor, backgroundColor) {
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.beginPath();
      ctx.arc(row, column, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  }

  function drawPlayers(gameState) {
    gameState.positions.forEach(([name, position]) => {
      fillCell(...position.split(","), name[0].toUpperCase(), "white", "#60c");
    });
  }

  function drawCoins(gameState) {
    Object.entries(gameState.coins).forEach(([position, coinValue]) => {
      fillCell(...position.split(","), coinValue, "black");
    });
  }

  // To draw the scoreboard, first remove all the table rows corresponding to scores
  // (these are the <tr> elements with the `score` class). This leaves the rows with the
  // table headers intact. Then iterate through the name-score pairs and add new rows to
  // the table. We trust the server to send us the scores in the correct sorted order.
  //   function drawScores(gameState) {
  //     document.querySelectorAll("tr.score").forEach(e => e.remove());
  //     gameState.scores.forEach(([name, score]) => {
  //       const tableRow = document.createElement("tr");
  //       tableRow.innerHTML = `<td>${name}<td>${score}`;
  //       tableRow.className = "score";
  //       tableBody.appendChild(tableRow);
  //     });
  //   }

  function renderBoard(gameState) {
    clearCanvas();
    // drawCoins(gameState);
    drawPlayers(gameState);
    // drawScores(gameState);
  }

  // When the join button is clicked, send the name to the server in a `name` message.
  document.querySelector("input#join").addEventListener("click", () => {
    socket.emit("name", document.querySelector("input#username-input").value);
  });

  // When an arrow key is pressed, send a `move` message with a single-character argument
  // to the server.

  canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    let [x, y] = [e.clientX - 10 - rect.left, e.clientY - 10 - rect.top];
    x += e.clientX / 40;
    y += e.clientY / 40;
    if (x <= 630 && x >= 10 && y <= 630 && y >= 10) {
      socket.emit("move", JSON.stringify([x, y]));
    }
    e.preventDefault();
  }),
    // When the server tells us the name is bad, render an error message.
    socket.on("badname", name => {
      document.querySelector(
        ".error"
      ).innerHTML = `Name ${name} too short, too long, or taken`;
    });

  // When the server sends us the `welcome` message, hide the lobby for and show the game board.
  socket.on("welcome", () => {
    document.querySelector("div#login").style.display = "none";
    document.querySelector("div#game").style.display = "block";
  });

  // When the server sends us a `state` message, render the game state it sends us.
  socket.on("state", renderBoard);
})();
