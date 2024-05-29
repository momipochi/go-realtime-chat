import { useState } from "react";
import { ChatBox } from "./ChatBox";
import { ChatBoxContext } from "../context/chatBoxContext";

export const ChatBoxContextWrapper = () => {
  const [userId, setUserId] = useState("");
  return (
    <ChatBoxContext.Provider value={{ userId, setUserId }}>
      <ChatBox></ChatBox>
    </ChatBoxContext.Provider>
  );
};
