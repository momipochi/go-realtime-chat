import { useEffect, useState } from "react";
import { connect, sendMessage } from "../api";

export const ChatBox = () => {
  const [chatHistory, setChatHistory] = useState<MessageEvent<any>[]>([]);
  useEffect(() => {
    connect(setChatHistory);
  }, []);
  return (
    <>
      <div>
        {chatHistory.map((x, index) => (
          <div key={index}>
            index:{index} {x.data}
          </div>
        ))}
      </div>
      <div>ChatHistory count: {chatHistory.length}</div>
      <button onClick={() => sendMessage(`Hello world ${Math.random()}`)}>
        Hello from chat box
      </button>
    </>
  );
};
