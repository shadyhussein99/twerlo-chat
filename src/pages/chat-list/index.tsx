import { ChatListHeader } from "./components/ChatListHeader";
import { ChatList } from "./components/ChatList";

const ChatListPage = () => {
  return (
    <div
      onClick={() => null}
      className="flex items-center justify-center min-h-screen px-4 py-8 bg-primary-light"
    >
      <div className="w-full max-w-md space-y-6">
        <ChatListHeader />
        <ChatList />
      </div>
    </div>
  );
};

export default ChatListPage;
