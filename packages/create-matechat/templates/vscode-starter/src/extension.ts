import * as vscode from 'vscode';
import { MatechatWebviewProvider } from './webview';

export function activate(context: vscode.ExtensionContext) {
  vscode.window.registerWebviewViewProvider(
    MatechatWebviewProvider.viewType,
    new MatechatWebviewProvider(context.extensionUri),
  );
}

export function deactivate() {}
