import { ChatListHeader } from "./components/ChatListHeader";
import { ChatList } from "./components/ChatList";
import { BroadcastMessage } from "./components/BroadcastMessage";
import { useState } from "react";

const ChatListPage = () => {
  const [isBroadcastEnabled, setIsBroadcastEnabled] = useState(false);
  const [broadCastContacts, setBroadCastContacts] = useState<string[]>([]);

  return (
    <div
      onClick={() => null}
      className="flex items-center justify-center flex-1 px-4 py-8 bg-primary-light h-[calc(100dvh-64px)]"
    >
      <div className="w-full max-w-md space-y-6">
        <ChatListHeader />

        <BroadcastMessage
          isBroadcastEnabled={isBroadcastEnabled}
          broadCastContacts={broadCastContacts}
          setIsBroadcastEnabled={setIsBroadcastEnabled}
          setBroadCastContacts={setBroadCastContacts}
        />

        <ChatList
          isBroadcastEnabled={isBroadcastEnabled}
          broadCastContacts={broadCastContacts}
          setBroadCastContacts={setBroadCastContacts}
        />
      </div>
    </div>
  );
};

export default ChatListPage;
