const usernameFormInput = $('#username-input')
const usernameFormButton = $('#username-button');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let username = '';

const socket = new WebSocket(`ws://${location.hostname}:50001`);


usernameFormButton.click(() => {
  console.log('BUTTON CLICKED');
  username = usernameFormInput.val().toLowerCase();
  if (username) {
    console.log(`USERNAME: ${username}`);
    // socket.emit('submitted username', username);
    socket.send(JSON.stringify(username));
  }
});

socket.addEventListener('username-taken', () => {
  // usernameFormInput.val('');
  $('#taken-username').removeAttr('display');
});


socket.addEventListener('message', (event) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  JSON.parse(event.data).forEach(({ location, color }) => {
    ctx.fillStyle = color;
    ctx.fillRect(...location, 10, 10);
  });
});

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const [x, y] = [e.clientX - rect.left, e.clientY - rect.top];
  socket.send(JSON.stringify([x, y]));
});

// TODO: update to current jQuery
// When the server sends us the `welcome` message, hide the lobby for and show the game board.
socket.addEventListener('welcome', () => {
  $('#login').style.display = 'none';
  $('#game').style.display = 'block';
});
