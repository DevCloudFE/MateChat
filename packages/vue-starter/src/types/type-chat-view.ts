export interface IMessageAvatar {
  imgSrc: string;
  width: number;
  height: number;
}
export interface IMessage {
  from: 'user' | 'ai-model';
  avatarPosition: 'side-left' | 'side-right';
  avatarConfig: IMessageAvatar;
  content: unknown;
  loading?: boolean;
  complete?: boolean;
}
