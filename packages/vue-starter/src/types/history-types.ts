import type { IMessage } from "./type-chat-view";

export interface IHistoryItem {
  messages: IMessage[];
  updateDate: string;
  chatId: string;
}

export type HistoryList = IHistoryItem[];
