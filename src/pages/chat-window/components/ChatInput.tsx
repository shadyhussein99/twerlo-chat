import { useState } from "react";
import { useParams } from "react-router-dom";
import { scrollToBottom } from "../../../utils";
import { AppInput, AppButton } from "../../../components/ui";
import {
  SenderType,
  type IContactDetails,
} from "../../../types/contactDetails";

interface IChatINputProps {
  selectedChat: IContactDetails;
  messagesRef: React.RefObject<HTMLDivElement | null>;
  storedValue?: IContactDetails[];
  setValue: (value: IContactDetails[]) => void;
}

export const ChatInput = ({
  selectedChat,
  messagesRef,
  storedValue,
  setValue,
}: IChatINputProps) => {
  const params = useParams();
  const [input, setInput] = useState("");

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
    scrollToBottom(messagesRef);
  };

  return (
    <div className="sticky bottom-0 flex items-center h-16 gap-2 px-4 py-3 bg-white shadow-md">
      <AppInput
        type="text"
        placeholder="Type a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-1 px-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <AppButton
        title="Send"
        onClick={handleSend}
        className="mb-4 rounded-full "
      />
    </div>
  );
};
