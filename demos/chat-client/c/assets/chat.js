const msgBox = document.getElementById("inbox_msg");

// Create WebSocket connection.
// const socket = new WebSocket("wss://" + location.hostname + ":50010/"); // wants 5500
const socket = new WebSocket('wss://localhost:50000');

// Connection opened
socket.addEventListener('open', (event) => {
    socket.send('Hello Server!');
    console.log("hello server");
});

// Listen for messages
socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
});