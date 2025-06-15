import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { storageNames } from "../../constants/storageNames";
import { ChatWindowHeader } from "./components/ChatWindowHeader";
import { type IContactDetails } from "../../types/contactDetails";
import { ChatMessages } from "./components/ChatMessages";
import { ChatInput } from "./components/ChatInput";

const ChatWindow = () => {
  const params = useParams();
  const messagesRef = useRef<HTMLDivElement>(null);

  // const [messages, setMessages] = useState<IMessage[]>([
  //   { id: "Sdf", text: "Hey there!", sender: SenderType.Other },
  //   { id: "Sdfds", text: "Hi! How are you?", sender: SenderType.Me },
  // ]);

  const { storedValue, setValue } = useLocalStorage<IContactDetails[]>(
    storageNames.contactsDetails
  );

  const selectedChat = storedValue?.find((chat) => chat.id === params.id);

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

      <ChatMessages
        messages={selectedChat?.messages}
        messagesRef={messagesRef}
      />

      <ChatInput
        selectedChat={selectedChat}
        messagesRef={messagesRef}
        storedValue={storedValue}
        setValue={setValue}
      />
    </div>
  );
};

export default ChatWindow;
