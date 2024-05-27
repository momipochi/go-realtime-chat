let socket = new WebSocket("ws://localhost:8080/ws");
let chatHistory: MessageEvent<any>[] = [];
let connect = (
  setChatHistory: React.Dispatch<React.SetStateAction<MessageEvent<any>[]>>
) => {
  console.log("Attempting to connect...");

  socket.onopen = () => {
    console.log("Successfully connected.");
  };

  socket.onclose = () => {
    console.log("Socket connection closed");
  };

  socket.onmessage = (event) => {
    console.log("Message received: ", event);
    chatHistory.push(event);

    setChatHistory([...chatHistory]);
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
