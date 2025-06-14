import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { storageNames } from "../../constants/storageNames";
import { ChatWindowHeader } from "./components/ChatWindowHeader";
import { SenderType, type IContactDetails } from "../../types/contactDetails";
import { ChatMessages } from "./components/ChatMessages";

const ChatWindow = () => {
  const params = useParams();

  // const [messages, setMessages] = useState<IMessage[]>([
  //   { id: "Sdf", text: "Hey there!", sender: SenderType.Other },
  //   { id: "Sdfds", text: "Hi! How are you?", sender: SenderType.Me },
  // ]);
  const [input, setInput] = useState("");

  const { storedValue, setValue } = useLocalStorage<IContactDetails[]>(
    storageNames.contactsDetails
  );
  const selectedChat = storedValue?.find((chat) => chat.id === params.id);

  const handleSend = () => {
    if (!input.trim()) return;

    const chatWithNewMessage = {
      ...selectedChat!,
      messages: [
        ...(selectedChat?.messages || []),
        {
          id: String(Date.now()),
          text: input,
          sender: SenderType.Me,
          date: new Date(),
        },
      ],
    };

    const otherChats = storedValue?.filter((chat) => chat.id !== params.id);
    setValue([chatWithNewMessage, ...(otherChats || [])]);
    setInput("");
  };

  if (!selectedChat)
    return (
      <p className="px-4 py-3 font-semibold text-white shadow bg-primary">
        No Contact
      </p>
    );

  return (
    <div className="flex flex-col h-screen bg-primary-tint">
      <ChatWindowHeader
        contactName={selectedChat?.name || "Non-saved contact"}
      />

      <ChatMessages messages={selectedChat?.messages} />

      {/* Input */}
      <div className="sticky bottom-0 flex items-center gap-2 px-4 py-3 bg-white shadow-md">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 text-white transition rounded-full cursor-pointer bg-primary hover:bg-primary-hover"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
