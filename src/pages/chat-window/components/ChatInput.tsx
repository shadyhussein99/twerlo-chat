import { useState } from "react";
import { useParams } from "react-router-dom";
import { scrollToBottom } from "../../../utils";
import { AppInput, AppButton } from "../../../components/ui";
import { MediaUpload } from "../../../components/shared";
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

  const sendMessage = (message: IContactDetails) => {
    const otherChats = storedValue?.filter((chat) => chat.id !== params.id);
    setValue([message, ...(otherChats || [])]);
    scrollToBottom(messagesRef);
  };

  const handleSendText = () => {
    if (!input.trim()) return;

    const textMessage = {
      id: String(Date.now()),
      text: input,
      sender: SenderType.Me,
      date: new Date(),
    };

    const chatWithNewMessage = {
      ...selectedChat,
      messages: [...(selectedChat?.messages || []), textMessage],
    };

    setInput("");
    sendMessage(chatWithNewMessage);
  };

  const handleSendFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const imageUrl = URL.createObjectURL(file);

    const imageMessage = {
      id: String(Date.now()),
      imageUrl,
      sender: SenderType.Me,
      date: new Date(),
    };

    const chatWithImageMessage = {
      ...selectedChat,
      messages: [...(selectedChat?.messages || []), imageMessage],
    };

    e.target.value = "";
    sendMessage(chatWithImageMessage);
  };

  return (
    <div className="sticky bottom-0 flex items-center h-16 gap-2 px-4 py-3 bg-white shadow-md">
      <AppInput
        type="text"
        placeholder="Type a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendText()}
        className="flex-1 px-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <MediaUpload handleSendFile={handleSendFile} accept="image/*" />

      <AppButton
        title="Send"
        onClick={handleSendText}
        className="mb-4 rounded-full"
      />
    </div>
  );
};
