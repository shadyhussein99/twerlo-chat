import React, { useState, useRef } from "react";
import { AppTextField, AppButton } from "../../../components/ui";
import { MediaUpload } from "../../../components/shared";
import {
  SenderType,
  type IContactDetails,
} from "../../../types/contactDetails";
import { useContactsStore } from "../../../store/useContactsStore";

interface IChatInputProps {
  selectedContacts: IContactDetails[];
  messagesRef?: React.RefObject<HTMLDivElement | null>;
  setIsWaitingUserReply?: React.Dispatch<React.SetStateAction<boolean>>;
  isBroadcastEnabled?: boolean;
}

export const ChatInput = ({
  selectedContacts,
  setIsWaitingUserReply,
  isBroadcastEnabled = false,
}: IChatInputProps) => {
  const [input, setInput] = useState("");
  const userReplyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { contacts, setContacts } = useContactsStore();

  const sendMessage = (updatedContacts: IContactDetails[]) => {
    // Filter the contacts we are not updating
    const otherChats = contacts?.filter(
      (contact) => !updatedContacts.some((c) => c.id === contact.id)
    );

    setContacts([...updatedContacts, ...(otherChats || [])]);

    if (userReplyTimeoutRef.current) {
      clearTimeout(userReplyTimeoutRef.current);
    }

    setIsWaitingUserReply?.(true);

    // Simulate sending user reply after 2 seconds
    userReplyTimeoutRef.current = setTimeout(() => {
      const contactsWithReplies = updatedContacts.map((contact) => {
        const randomText = Math.random().toString(36).substring(2, 9);
        const userReply = {
          id: String(Date.now() + Math.random()), // Ensure unique ID
          text: `This is random reply of 7 characters "${randomText}"`,
          sender: SenderType.Other,
          date: new Date(),
        };
        return {
          ...contact,
          messages: [...(contact?.messages || []), userReply],
        };
      });

      setContacts([...contactsWithReplies, ...(otherChats || [])]);
      setIsWaitingUserReply?.(false);
    }, 2000);
  };

  const handleSendText = () => {
    if (!input.trim() || selectedContacts?.length === 0) return;

    const textMessage = {
      id: String(Date.now()),
      text: input,
      sender: SenderType.Me,
      date: new Date(),
    };

    const updatedContacts = selectedContacts.map((contact) => ({
      ...contact,
      messages: [...(contact?.messages || []), textMessage],
    }));

    setInput("");
    sendMessage(updatedContacts);
  };

  const handleSendFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || selectedContacts.length === 0) return;

    const file = files[0];
    const imageUrl = URL.createObjectURL(file);

    const imageMessage = {
      id: String(Date.now()),
      imageUrl,
      sender: SenderType.Me,
      date: new Date(),
    };

    const updatedContacts = selectedContacts.map((contact) => ({
      ...contact,
      messages: [...(contact?.messages || []), imageMessage],
    }));

    e.target.value = "";
    sendMessage(updatedContacts);
  };

  return (
    <div className="sticky bottom-0 flex items-center h-16 gap-2 px-4 py-3 bg-white shadow-md">
      <AppTextField
        type="text"
        placeholder="Type a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendText()}
        className="flex-1 px-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <MediaUpload handleSendFile={handleSendFile} accept="image/*" />

      <AppButton
        title={`Send ${
          isBroadcastEnabled ? `(${selectedContacts?.length})` : ""
        }`}
        onClick={handleSendText}
        className="mb-4 rounded-full"
        disabled={!input.trim() || selectedContacts?.length === 0}
      />
    </div>
  );
};
