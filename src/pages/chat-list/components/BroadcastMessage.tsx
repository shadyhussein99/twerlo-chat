import { useContactsStore } from "../../../store/useContactsStore";
import { AppButton } from "../../../components/ui";
import { ChatInput } from "../../chat-window/components/ChatInput";

interface IBroadcastMessageProps {
  isBroadcastEnabled: boolean;
  broadCastContacts: string[];
  setIsBroadcastEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setBroadCastContacts: React.Dispatch<React.SetStateAction<string[]>>;
}

export const BroadcastMessage = ({
  isBroadcastEnabled,
  broadCastContacts,
  setIsBroadcastEnabled,
  setBroadCastContacts,
}: IBroadcastMessageProps) => {
  const handleClick = () => {
    setIsBroadcastEnabled((prev) => !prev);
    setBroadCastContacts([]);
  };

  const { contacts } = useContactsStore();

  const selectedContacts = contacts.filter((contact) =>
    broadCastContacts.includes(contact.id)
  );

  return (
    <>
      <AppButton
        title="Send Broadcast message"
        onClick={handleClick}
        className="w-full"
      />

      {isBroadcastEnabled && (
        <ChatInput
          selectedContacts={selectedContacts}
          isBroadcastEnabled={isBroadcastEnabled}
        />
      )}
    </>
  );
};
