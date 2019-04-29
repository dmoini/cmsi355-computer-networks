/* eslint-disable no-console */
(() => {
  const socket = io(); // eslint-disable-line no-undef
  const canvas = document.querySelector("canvas");
  const tableBody = document.querySelector("tbody");

  const ctx = canvas.getContext("2d");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const usernameInstructions = $("#username-instructions");
  const usernameFormInput = $("#username-input")
  const usernameFormButton = $("#join");

  function clearCanvas() {
    ctx.clearRect(0, 0, 640, 640);
  }

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const fillCell = (row, column, text, textColor, backgroundColor) => {
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.beginPath();
      ctx.arc(row, column, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  }

  const drawPlayers = (gameState) => {
    gameState.positions.forEach(([name, position]) => {
      fillCell(...position.split(","), name[0].toUpperCase(), "white", "#00FFFF");
    });
  }

  const drawCoins = (gameState) => {
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

  const renderBoard = (gameState) => {
    clearCanvas();
    // drawCoins(gameState);
    drawPlayers(gameState);
    // drawScores(gameState);
  }

  // When the join button is clicked, send the name to the server in a `name` message.
  usernameFormButton.on("click", () => {
    socket.emit("name", usernameFormInput.val().toUpperCase());
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
  });
  

  usernameFormInput.keypress((e) => {
    let key = e.which;
    if(key === 13) {  // the enter key code
       usernameFormButton.click();
       return false;  
     }
   });

  // When the server tells us the name is bad, render an error message.
  // let fontSize = 20;
  socket.on("badname", (name) => {
    console.log(`NAME ${name} taken`)
    // document.querySelector(
    //   ".error"
    // ).innerHTML = `Name ${name} too short, too long, or taken`;
    usernameInstructions.text(`Name ${name} too short, too long, or taken`);
    usernameInstructions.addClass("taken-username");
    // usernameInstructions.css("font-size", fontSize + "px");
  });

  // When the server sends us the `welcome` message, hide the lobby for and show the game board.
  socket.on("welcome", () => {
    $("#login").hide();
    $("#game").show();
  });

  // When the server sends us a `state` message, render the game state it sends us.
  socket.on("state", renderBoard);
})();
