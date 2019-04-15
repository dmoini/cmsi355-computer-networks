const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const socket = new WebSocket(`ws://${location.hostname}:50001`);

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const [x, y] = [e.clientX - rect.left, e.clientY - rect.top];
  socket.send(JSON.stringify([x, y]));
});

socket.addEventListener('message', (event) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  JSON.parse(event.data).forEach(({ location, color }) => {
    ctx.fillStyle = color;
    ctx.fillRect(...location, 10, 10);
  });
});