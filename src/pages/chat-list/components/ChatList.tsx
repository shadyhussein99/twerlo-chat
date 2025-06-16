import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useContactsStore } from "../../../store/useContactsStore";
import { storageNames } from "../../../constants/storageNames";
import contactsDetails from "../../../mocked-data/contactsDetails.json";
import type { IContactDetails } from "../../../types/contactDetails";
import { AppCheckbox } from "../../../components/ui";

interface ChatListProps {
  isBroadcastEnabled: boolean;
  broadCastContacts: string[];
  setBroadCastContacts: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ChatList = ({
  isBroadcastEnabled,
  broadCastContacts,
  setBroadCastContacts,
}: ChatListProps) => {
  const navigate = useNavigate();

  const { setValue, isStored } = useLocalStorage<IContactDetails[]>(
    storageNames.contactsDetails,
    contactsDetails
  );

  const { contacts, setContacts } = useContactsStore();

  const handleCheckboxChange = (contactID: string) => {
    const isContactIncludedInBroadcast = broadCastContacts.includes(contactID);

    if (isContactIncludedInBroadcast) {
      setBroadCastContacts((prev) => prev.filter((id) => id !== contactID));
    } else {
      setBroadCastContacts((prev) => [...prev, contactID]);
    }
  };

  // #region effects
  useEffect(() => {
    if (!isStored) {
      setValue(contactsDetails);
      setContacts(contactsDetails);
    }
  }, [isStored, setContacts, setValue]);

  return (
    <div className="flex flex-col justify-center space-y-6">
      <div className="space-y-2">
        {contacts?.map((contact) => {
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
              className="flex items-center gap-4 p-4 transition duration-200 ease-in-out bg-white shadow-sm cursor-pointer rounded-xl hover:bg-primary-tint"
            >
              {isBroadcastEnabled && (
                <AppCheckbox
                  isChecked={broadCastContacts.includes(contact.id)}
                  handleChange={() => handleCheckboxChange(contact.id)}
                />
              )}

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
                  {lastContent}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
