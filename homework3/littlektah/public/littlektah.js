let socket = io();
const usernameInstructions = $("#username-instructions");
const usernameFormInput = $("#username-input")
const usernameFormButton = $("#username-button");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let username = "";

// const socket = new WebSocket(`ws://${location.hostname}:50001`);
// const socket = new io.Socket("localhost",{ port: 50001 });
// socket.connect();

usernameFormButton.click(() => {
  console.log("BUTTON CLICKED");
  username = usernameFormInput.val().toLowerCase();
  if (username) {
    console.log(`USERNAME: ${username}`);
    // socket.emit("submitted username", username);
    // socket.send(JSON.stringify(username, username));
    socket.emit("submitted username", username);
  }
});

usernameFormInput.keypress((e) => {
  let key = e.which;
  if(key == 13) {  // the enter key code
     usernameFormButton.click();
     return false;  
   }
 });

let fontSize = 20;
socket.on("username-taken", () => {
  // usernameFormInput.val("");
  console.log("CLIENT username taken")
  // console.log($("#taken-username").text());
  // console.log(JSON.stringify($("#taken-username")));
  usernameInstructions.addClass("taken-username");
  usernameInstructions.css("font-size", fontSize + "px");
  if (fontSize < 33) {
    fontSize += 1;
  }
  // console.log(`FONT SIZE: ${fontSize}`);
});


socket.on("message", (event) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  JSON.parse(event.data).forEach(({ location, color }) => {
    ctx.fillStyle = color;
    ctx.fillRect(...location, 10, 10);
  });
});

canvas.addEventListener("mousemove", (e) => {
  console.log("MOUSEMOVE1");
  const rect = canvas.getBoundingClientRect();
  console.log("MOUSEMOVE2");
  const [x, y] = [e.clientX - rect.left, e.clientY - rect.top];
  console.log("MOUSEMOVE3");
  socket.emit("message", JSON.stringify([x, y]));
  console.log("MOUSEMOVE4");
});

// TODO: update to current jQuery
// When the server sends us the `welcome` message, hide the lobby for and show the game board.
socket.on("accepted username", () => {
  console.log("CLIENT accepted username")
  // $("#login").css("display", "none");
  // $("#game").css("display", "block");
  $("#login").hide()
  $("#game").show();
});
