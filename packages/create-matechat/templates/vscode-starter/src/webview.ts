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
        vscode.Uri.file(path.join(this._extensionUri.fsPath, 'resources')),
        this._extensionUri,
      ],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case 'applyCode': {
          const activeEditor = vscode.window.activeTextEditor;
          if (!activeEditor || activeEditor.document.isUntitled) {
            vscode.window.showErrorMessage(
              'No active editor or document found',
            );
            return;
          }

          const aiGeneratedCode: string = data.code || '';
          const untitledUri = vscode.Uri.parse(
            `untitled:ai_suggestion_${Date.now()}.${activeEditor.document.languageId}`,
          );

          const restoreEdit = new vscode.WorkspaceEdit();
          restoreEdit.insert(
            untitledUri,
            new vscode.Position(0, 0),
            activeEditor.document.getText(),
          );
          await vscode.workspace.applyEdit(restoreEdit, {
            isRefactoring: true,
          });

          const edit = new vscode.WorkspaceEdit();
          edit.insert(
            activeEditor.document.uri,
            activeEditor.selection.active,
            aiGeneratedCode,
          );
          await vscode.workspace.applyEdit(edit);

          await vscode.commands.executeCommand(
            'vscode.diff',
            untitledUri,
            activeEditor.document.uri,
            `${path.basename(activeEditor.document.fileName)}: Current ↔ AI Suggestion`,
          );

          break;
        }
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const htmlPath = path.join(
      this._extensionUri.fsPath,
      'resources',
      'index.html',
    );

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
