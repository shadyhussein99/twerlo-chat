import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useContactsStore } from "../../../store/useContactsStore";
import { storageNames } from "../../../constants/storageNames";
import contactsDetails from "../../../mocked-data/contactsDetails.json";
import type { IContactDetails } from "../../../types/contactDetails";

export const ChatList = () => {
  const navigate = useNavigate();

  const { setValue, isStored } = useLocalStorage<IContactDetails[]>(
    storageNames.contactsDetails,
    contactsDetails
  );

  const { messages, setMessages } = useContactsStore();

  // #region effects
  useEffect(() => {
    if (!isStored) {
      setValue(contactsDetails);
      setMessages(contactsDetails);
    }
  }, [isStored, setMessages, setValue]);

  return (
    <div className="space-y-2">
      {messages?.map((contact) => {
        const lastText = contact.messages[contact.messages.length - 1]?.text;
        const lastImage =
          contact.messages[contact.messages.length - 1]?.imageUrl;
        const lastContent = lastText
          ? lastText
          : lastImage
          ? "Image"
          : "No chat yet";

        return (
          <div
            key={contact.id}
            onClick={() => navigate(`/chat/${contact.id}`)}
            className="flex items-start gap-4 p-4 transition duration-200 ease-in-out bg-white shadow-sm cursor-pointer rounded-xl hover:bg-primary-tint"
          >
            <img
              src={contact.avatar}
              alt="Avatar"
              className="object-cover w-12 h-12 rounded-full shrink-0"
            />

            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-primary">{contact.name}</span>
              <span className="text-sm truncate text-grey-text">
                {lastContent}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
