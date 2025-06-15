import { create } from "zustand";
import type { IContactDetails } from "../types/contactDetails";
import { storageNames } from "../constants/storageNames";

interface IContactsStore {
  contacts: IContactDetails[];
  setContacts: (contacts: IContactDetails[]) => void;
}

export const useContactsStore = create<IContactsStore>((set) => {
  // Load from localStorage safely
  let initialContacts: IContactDetails[] = [];

  try {
    const stored = localStorage.getItem(storageNames.contactsDetails);
    if (stored) {
      initialContacts = JSON.parse(stored);
    }
  } catch (err) {
    console.error("Failed to parse contacts from localStorage", err);
  }

  return {
    contacts: initialContacts,

    setContacts: (contacts) => {
      set({ contacts: contacts });
      localStorage.setItem(
        storageNames.contactsDetails,
        JSON.stringify(contacts)
      );
    },
  };
});
