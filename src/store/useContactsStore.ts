import { create } from "zustand";
import type { IContactDetails } from "../types/contactDetails";
import { storageNames } from "../constants/storageNames";

interface IContactsStore {
  messages: IContactDetails[];
  setMessages: (contacts: IContactDetails[]) => void;
}

export const useContactsStore = create<IContactsStore>((set) => {
  // Load from localStorage safely
  let initialMessages: IContactDetails[] = [];

  try {
    const stored = localStorage.getItem(storageNames.contactsDetails);
    if (stored) {
      initialMessages = JSON.parse(stored);
    }
  } catch (err) {
    console.error("Failed to parse messages from localStorage", err);
  }

  return {
    messages: initialMessages,

    setMessages: (contacts) => {
      set({ messages: contacts });
      localStorage.setItem(
        storageNames.contactsDetails,
        JSON.stringify(contacts)
      );
    },
  };
});
