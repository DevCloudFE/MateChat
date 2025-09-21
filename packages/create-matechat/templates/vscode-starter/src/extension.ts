import * as vscode from 'vscode';
import { MatechatWebviewProvider } from './webview';

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "matechat-webview" is now active!',
  );

  vscode.window.registerWebviewViewProvider(
    MatechatWebviewProvider.viewType,
    new MatechatWebviewProvider(context.extensionUri),
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
