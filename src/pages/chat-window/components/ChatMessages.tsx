import { useState, useEffect } from "react";
import { scrollToBottom, formatDate } from "../../../utils";
import { SenderType, type IMessage } from "../../../types/contactDetails";
import { ScrollToBottomButton } from "../../../components/shared";
import { useContactsStore } from "../../../store/useContactsStore";

interface ChatMessagesProps {
  messages?: IMessage[];
  messagesRef?: React.RefObject<HTMLDivElement | null>;
  isWaitingUserReply: boolean;
}

export const ChatMessages = ({
  messages,
  messagesRef,
  isWaitingUserReply,
}: ChatMessagesProps) => {
  const [isFirstMount, setIsFirstMount] = useState(true);

  const { contacts } = useContactsStore();

  // #region effects
  useEffect(() => {
    if (isFirstMount) {
      scrollToBottom(messagesRef);
      setIsFirstMount(false);
    }
  }, [isFirstMount, messagesRef]);

  const messagesWithWaitingResponse = isWaitingUserReply
    ? [
        ...(messages || []),
        {
          id: "staticID",
          text: "Typing ...",
          sender: SenderType.Other,
          date: new Date(),
        },
      ]
    : messages || [];

  const renderMessage = (message: IMessage) => {
    const messageType = message.text ? "text" : "image";

    switch (messageType) {
      case "text":
        return <p>{message.text}</p>;
      case "image":
        return (
          <img
            src={message.imageUrl}
            alt="uploaded"
            className="max-w-xs rounded-lg"
          />
        );
    }
  };

  useEffect(() => {
    scrollToBottom(messagesRef);
  }, [contacts, messagesRef]);

  return (
    <>
      <div className="flex-1 p-4 space-y-6 overflow-y-auto" ref={messagesRef}>
        {messagesWithWaitingResponse?.map((msg) => (
          <div
            key={msg.id}
            className={`w-fit max-w-[70%] px-4 py-2 rounded-lg ${
              msg.sender === SenderType.Me
                ? "ml-auto bg-primary text-white"
                : "mr-auto bg-primary-light text-black"
            } ${
              msg.id === "staticID" ? "animate-pulse bg-white text-primary" : ""
            }`}
          >
            {renderMessage(msg)}

            {!isWaitingUserReply && (
              <p className="flex justify-end text-tiny">
                {formatDate(msg.date)}
              </p>
            )}
          </div>
        ))}
      </div>
      <ScrollToBottomButton scrollRef={messagesRef} />
    </>
  );
};
