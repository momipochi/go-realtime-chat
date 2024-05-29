import { useEffect, useState } from "react";
import { connect, sendMessage } from "../api";
import { Message } from "../dto/messages";
import { useChatBoxContext } from "../context/chatBoxContext";

export const ChatBox = () => {
  const [msg, setMsg] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const { userId, setUserId } = useChatBoxContext();

  useEffect(() => {
    connect(setChatHistory, setUserId);
  }, []);

  return (
    <>
      <div>
        {chatHistory.map((x, index) => (
          <div key={index}>
            {x.clientId === userId ? <div>client:{x.clientId}</div> : <></>}
            index:
            {index} {x.body}
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
