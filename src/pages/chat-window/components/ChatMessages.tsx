import { SenderType, type IMessage } from "../../../types/contactDetails";

interface ChatMessagesProps {
  messages?: IMessage[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="flex-1 p-4 space-y-3 overflow-y-auto">
      {messages?.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
            msg.sender === SenderType.Me
              ? "ml-auto bg-primary text-white"
              : "mr-auto bg-primary-light text-black"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};
