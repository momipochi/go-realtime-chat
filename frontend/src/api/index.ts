import { Message } from "../dto/messages";

let socket = new WebSocket("ws://localhost:8080/ws");
let chatHistory: Message[] = [];
let clientId: string = "";

let connect = (
  setChatHistory: React.Dispatch<React.SetStateAction<Message[]>>,
  setClientId: React.Dispatch<React.SetStateAction<string>>
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
    try {
      let data: Message = JSON.parse(event.data);
      if (clientId === "") {
        clientId = data.clientId;
        setClientId(clientId);
      }
      chatHistory.push(data);
    } catch (error) {}

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
