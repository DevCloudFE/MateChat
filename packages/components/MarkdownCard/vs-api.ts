import type { WebviewApi } from 'vscode-webview';

export const vscode: WebviewApi<unknown> | undefined = acquireVsCodeApi?.();
export const isVscode = typeof vscode !== 'undefined';
