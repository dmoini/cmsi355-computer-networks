const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(50901, () => {
  console.log("Listening on port 50901");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/chat.html");
});

let users = [];
const MAX_NUMBER_OF_USERS = 2;
const commandsInfo = {
  "/help": "view available commands and descriptions",
  "/link <text>": "posts url of <text>",
  "/listusers": "lists all current users in chatroom",
  "/scream <text>": "capitalizes <text>",
  "/quit": "leave chat",
  "/whisper <text>": "lowercases <text>",
};

io.on("connection", socket => {
  console.log("A new user has joined the chat!");

  socket.on("username", data => {
    console.log(data);

    if (users.includes(data)) {
      socket.emit("username declined");
      console.log("Username " + data + " is taken");
    } else {
      console.log("Username " + data + " was accepted");
      users.push(data);
      socket.username = data;
      if (users.length - 1 === MAX_NUMBER_OF_USERS) {
        socket.emit("max users");
        users = users.filter(e => e !== socket.username);
        socket.disconnect(true);
      } else {
        io.emit("message", socket.username + " has joined the chat");
        console.log(users);
      }
    }
  });

  socket.on("message", data => {
    console.log("====================");
    console.log(data);
    let user = data.user;
    let msg = data.msg;
    if (msg.length > 280) {
      msg = msg.substring(0, 281);
    }
    if (msg.startsWith("/")) {
      let spaceIndex = msg.indexOf(" ");
      let command =
        spaceIndex === -1 ? msg.substring(1) : msg.substring(1, spaceIndex);
      let message =
        spaceIndex === -1 ? "" : msg.substring(spaceIndex + 1).trim();
      switch (command) {
        case "help":
          let commandInfoString = "";
          for (k in commandsInfo) {
            commandInfoString += k + ": " + commandsInfo[k] + "\n";
          }
          socket.emit("help command", commandInfoString);
          break;
        case "link":
          let linkObj = {
            user: user,
            link: message,
          };
          io.emit("link command", linkObj);
          break;
        case "listusers":
          socket.emit("list users command", users.join(", "));
          break;
        case "scream":
          io.emit("message", user + ": " + message.toUpperCase());
          break;
        case "whisper":
          io.emit("message", user + ": " + message.toLowerCase());
          break;
        case "quit":
          console.log(user + " has quit");
          socket.emit("quit command");
          setTimeout(() => socket.disconnect(true), 100);
          break;
        default:
          socket.emit("unrecognized command", command);
      }
    } else {
      io.emit("message", user + ": " + msg);
    }
  });

  socket.on("disconnect", () => {
    users = users.filter(e => e !== socket.username);
    if (socket.username) {
      io.emit("message", socket.username + " has left the chat");
    }
    console.log("A user has disconnected :(");
    console.log(users);
  });
});
