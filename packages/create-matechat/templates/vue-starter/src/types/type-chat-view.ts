export interface IMessageAvatar {
  imgSrc: string;
  width: number;
  height: number;
}
export interface IMessageContent {
  text?: string;
  image?: string;
}

export interface IMessage {
  from: 'user' | 'assistant';
  avatarPosition: 'side-left' | 'side-right';
  avatarConfig: IMessageAvatar;
  reasoning_content?: string;
  startTime?: number;
  endTime?: number;
  content: IMessageContent;
  loading?: boolean;
  complete?: boolean;
  isThinkShrink?: boolean;
}
