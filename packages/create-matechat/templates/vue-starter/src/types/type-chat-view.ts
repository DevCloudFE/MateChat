export interface IMessageAvatar {
  imgSrc: string;
  width: number;
  height: number;
}
export interface IMessage {
  from: 'user' | 'assistant';
  avatarPosition: 'side-left' | 'side-right';
  avatarConfig: IMessageAvatar;
  reasoning_content?: string;
  startTime?: number;
  endTime?: number;
  content: unknown;
  loading?: boolean;
  complete?: boolean;
  isThinkShrink?: boolean;
}
