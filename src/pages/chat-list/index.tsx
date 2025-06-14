import { ChatListHeader } from "./components/ChatListHeader";
import { ChatList } from "./components/ChatList";

const ChatListPage = () => {
  return (
    <div
      onClick={() => null}
      className="flex items-center justify-center flex-1 px-4 py-8 bg-primary-light h-[calc(100dvh-64px)]"
    >
      <div className="w-full max-w-md space-y-6">
        <ChatListHeader />
        <ChatList />
      </div>
    </div>
  );
};

export default ChatListPage;
