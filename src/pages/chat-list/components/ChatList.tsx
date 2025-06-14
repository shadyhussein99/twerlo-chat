import contacts from "../../../mocked-data/contacts.json";

export const ChatList = () => {
  return (
    <div className="space-y-2">
      {contacts.map((contact) => {
        const lastMessage = contact.messages[0];

        return (
          <div
            key={contact.avatar}
            className="flex items-start gap-4 p-4 transition duration-200 ease-in-out bg-white shadow-sm cursor-pointer rounded-xl hover:bg-primary-tint"
          >
            <img
              src={contact.avatar}
              alt="Avatar"
              className="object-cover w-12 h-12 rounded-full shrink-0"
            />

            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-primary">
                {contact.name}
              </span>
              <span className="text-sm truncate text-grey-text">
                {lastMessage ?? "No chat yet"}
                {/* TODO: Change this to display the last message */}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
