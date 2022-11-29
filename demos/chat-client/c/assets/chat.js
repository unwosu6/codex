let msgBox = document.getElementById("inbox");
// import fs from "fs";

function fromServer(text) {
    let incoming_msg = document.createElement("div");
    incoming_msg.className = "incoming_msg";

    // <div class="incoming_msg_img"> <img src="./enarx_logo.svg" alt="enarx logo"> </div>
    let pic = document.createElement("div");
    let img = document.createElement("img");
    pic.className = "incoming_msg_img";
    img.src = "./enarx_logo.svg";
    img.alt = "enarx logo";
    pic.appendChild(img);
    incoming_msg.appendChild(pic);

    let received_msg = document.createElement("div");
    received_msg.className = "received_msg";
    let received_withd_msg = document.createElement("div");
    received_withd_msg.className = "received_withd_msg";
    received_withd_msg.innerHTML = `<p>${text}</p>`;
    received_msg.appendChild(received_withd_msg);
    incoming_msg.appendChild(received_msg);
    msgBox.appendChild(incoming_msg);
}

function fromClient(text) {
    let outgoing_msg = document.createElement("div");
    let sent_msg = document.createElement("div");
    outgoing_msg.className = "outgoing_msg";
    sent_msg.className = "sent_msg";
    sent_msg.innerHTML = `<p>${text}</p>`;
    outgoing_msg.appendChild(sent_msg);
    msgBox.appendChild(outgoing_msg);
}

// temporary tests to ensure funtions work
fromServer("server");
fromClient("client");

// Create WebSocket connection.
const socket = new WebSocket("ws://127.0.0.1:50000/", "tcp");
// const socket = new WebSocket("wss://" + location.hostname + ":50022/"); // wants 5500
// const socket = new WebSocket('wss://localhost:50000');

// Connection opened
socket.onopen = (event) => {
    exampleSocket.send("Here's some text that the server is urgently awaiting!");
    fromServer("socket.onopen");
};
socket.addEventListener('open', (event) => {
    socket.send('Hello Server!');
    console.log("hello server");
    fromServer("socket.addEventListener('open',");
});

// Listen for messages
socket.onmessage = (event) => {
    console.log(event.data);
    fromServer(event.data);
    fromServer("socket.onmessage");
}
socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
    fromServer(event.data);
    fromServer("socket.addEventListener('message'");
});