import { useEffect, useState } from "react";
import { connect, sendMessage } from "../api";
import { Message } from "../dto/messages";

export const ChatBox = () => {
  const [msg, setMsg] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  useEffect(() => {
    connect(setChatHistory);
  }, []);
  return (
    <>
      <div>
        {chatHistory.map((x, index) => (
          <div key={index}>
            index:{index} {x.body}
          </div>
        ))}
      </div>
      <div>ChatHistory count: {chatHistory.length}</div>
      <input
        type="text"
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
      />
      <button
        onClick={() => {
          sendMessage(msg);
          setMsg("");
        }}
      >
        send
      </button>
    </>
  );
};
