import { readFileSync } from 'node:fs';
import path from 'node:path';
import * as vscode from 'vscode';

export class MatechatWebviewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'matechat-webview.view';

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(path.join(this._extensionUri.fsPath, 'media')),
        vscode.Uri.file(path.join(this._extensionUri.fsPath, 'resources')),
        this._extensionUri,
      ],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const htmlPath = path.join(
      this._extensionUri.fsPath,
      'resources',
      'index.html',
    );
    console.warn(htmlPath);
    const htmlContent = readFileSync(htmlPath, 'utf8').replace(
      /(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g,
      (match, prefix, src) => {
        if (src.startsWith('http') || src.startsWith('data:')) {
          return match;
        }
        const resourceUri = vscode.Uri.file(
          path.resolve(this._extensionUri.fsPath, 'resources', src),
        );
        const webviewUri = webview.asWebviewUri(resourceUri);
        return `${prefix}${webviewUri}"`;
      },
    );
    return htmlContent;
  }
}
