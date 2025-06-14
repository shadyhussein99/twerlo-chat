export enum SenderType {
  Me = "me",
  Other = "other",
}

export interface IMessage {
  id: string;
  text: string;
  sender: SenderType;
}

export interface IContactDetails {
  id: string;
  name: string;
  avatar: string;
  messages: IMessage[];
}
