let socket = new WebSocket("ws://localhost:8080/ws");
let connect = () => {
  console.log("Attempting to connect...");

  socket.onopen = () => {
    console.log("Successfully connected.");
  };

  socket.onclose = () => {
    console.log("Socket connection closed");
  };

  socket.onmessage = (event) => {
    console.log("Message received: ", event);
  };

  socket.onerror = (error) => {
    console.log("Socket error: ", error);
  };
};

let sendMessage = (msg: string) => {
  console.log("Sending message: ", msg);
  socket.send(msg);
};

export { connect, sendMessage };
