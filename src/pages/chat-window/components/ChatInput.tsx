import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppInput, AppButton } from "../../../components/ui";
import { MediaUpload } from "../../../components/shared";
import {
  SenderType,
  type IContactDetails,
} from "../../../types/contactDetails";
import { useContactsStore } from "../../../store/useContactsStore";

interface IChatINputProps {
  selectedContact: IContactDetails;
  messagesRef: React.RefObject<HTMLDivElement | null>;
  setIsWaitingUserReply: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatInput = ({
  selectedContact,
  setIsWaitingUserReply,
}: IChatINputProps) => {
  const params = useParams();
  const [input, setInput] = useState("");
  const userReplyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { contacts, setContacts } = useContactsStore();

  const sendMessage = (contact: IContactDetails) => {
    const otherChats = contacts?.filter((contact) => contact.id !== params.id);
    setContacts([contact, ...(otherChats || [])]);

    // Simulate sending user reply after 2 seconds
    if (userReplyTimeoutRef.current) {
      clearTimeout(userReplyTimeoutRef.current);
    }

    setIsWaitingUserReply(true);
    userReplyTimeoutRef.current = setTimeout(() => {
      const randomText = Math.random().toString(36).substring(2, 9);

      const userReply = {
        id: String(Date.now()),
        text: `This is random reply of 7 characters "${randomText}"`,
        sender: SenderType.Other,
        date: new Date(),
      };
      const contactWithUserReply = {
        ...contact,
        messages: [...(contact?.messages || []), userReply],
      };
      setContacts([contactWithUserReply, ...(otherChats || [])]);
      setIsWaitingUserReply(false);
    }, 2000);
  };

  const handleSendText = () => {
    if (!input.trim()) return;

    const textMessage = {
      id: String(Date.now()),
      text: input,
      sender: SenderType.Me,
      date: new Date(),
    };

    const contactWithTextMessage = {
      ...selectedContact,
      messages: [...(selectedContact?.messages || []), textMessage],
    };

    setInput("");
    sendMessage(contactWithTextMessage);
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

    const contactWithImageMessage = {
      ...selectedContact,
      messages: [...(selectedContact?.messages || []), imageMessage],
    };

    e.target.value = "";
    sendMessage(contactWithImageMessage);
  };

  // #region effects
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="sticky bottom-0 flex items-center h-16 gap-2 px-4 py-3 bg-white shadow-md">
      <AppInput
        type="text"
        placeholder="Type a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendText()}
        className="flex-1 px-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        ref={inputRef}
      />

      <MediaUpload handleSendFile={handleSendFile} accept="image/*" />

      <AppButton
        title="Send"
        onClick={handleSendText}
        className="mb-4 rounded-full"
        disabled={!input.trim()}
      />
    </div>
  );
};
