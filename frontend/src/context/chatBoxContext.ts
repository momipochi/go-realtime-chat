import { createContext, useContext } from "react";

export type ChatBoxContext = {
  userId: string | undefined;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

export const ChatBoxContext = createContext<ChatBoxContext>({
  userId: undefined,
  setUserId: () => {},
});

export const useChatBoxContext = () => useContext(ChatBoxContext);
