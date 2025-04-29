export enum DisplayShape {
  Immersive = "Immersive", // 沉浸式
  Assistant = "Assistant", // 助手式
}

export interface IGlobalConfig {
  displayShape: DisplayShape;
}
