import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useContactsStore } from "../../store/useContactsStore";
import { ChatWindowHeader } from "./components/ChatWindowHeader";
import { ChatMessages } from "./components/ChatMessages";
import { ChatInput } from "./components/ChatInput";

const ChatWindow = () => {
  const params = useParams();
  const [isWaitingUserReply, setIsWaitingUserReply] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const { contacts } = useContactsStore();

  const selectedContact = contacts?.find((contact) => contact.id === params.id);

  if (!selectedContact)
    return (
      <p className="px-4 py-3 font-semibold text-white shadow bg-primary">
        No Contact
      </p>
    );

  return (
    <div className="flex flex-col h-screen bg-primary-tint">
      <ChatWindowHeader
        contactName={selectedContact?.name || "Non-saved contact"}
      />

      <ChatMessages
        messages={selectedContact?.messages}
        messagesRef={messagesRef}
        isWaitingUserReply={isWaitingUserReply}
      />

      <ChatInput
        selectedContacts={[selectedContact]}
        messagesRef={messagesRef}
        setIsWaitingUserReply={setIsWaitingUserReply}
      />
    </div>
  );
};

export default ChatWindow;
