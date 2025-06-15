import { useState, useEffect } from "react";
import { scrollToBottom, formatDate } from "../../../utils";
import { SenderType, type IMessage } from "../../../types/contactDetails";
import { ScrollToBottomButton } from "../../../components/shared";

interface ChatMessagesProps {
  messages?: IMessage[];
  messagesRef?: React.RefObject<HTMLDivElement | null>;
}

export const ChatMessages = ({ messages, messagesRef }: ChatMessagesProps) => {
  const [isFirstMount, setIsFirstMount] = useState(true);

  // #region effects
  useEffect(() => {
    if (isFirstMount) {
      scrollToBottom(messagesRef);
      setIsFirstMount(false);
    }
  }, [isFirstMount, messagesRef]);

  return (
    <>
      <div className="flex-1 p-4 space-y-3 overflow-y-auto" ref={messagesRef}>
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[70%] px-4 py-2 rounded-lg ${
              msg.sender === SenderType.Me
                ? "ml-auto bg-primary text-white"
                : "mr-auto bg-primary-light text-black"
            }`}
          >
            <p>{msg.text}</p>
            <p className="flex justify-end text-tiny">{formatDate(msg.date)}</p>
          </div>
        ))}
      </div>
      <ScrollToBottomButton scrollRef={messagesRef} />
    </>
  );
};
