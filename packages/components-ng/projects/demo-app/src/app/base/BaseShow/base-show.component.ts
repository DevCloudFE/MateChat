export class BaseShowComponent {
    sourceCode: Array<{ type: string; code: string }> = [];
    urls: Array<{ type: string; path: string }> = [];

    constructor() {}
    
    async loadFiles(urls: Array<{ type: string; path: string }>) {
       new Promise(async (resolve, reject) => {
            try {
                for (const url of urls) {
                    const response = await fetch(url.path);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${url.type} file: ${response.status}`);
                    }
                    const code = await response.text();
                    this.sourceCode.push({ type: url.type, code });
                    resolve(this.sourceCode);
                }
            } catch (error) {
                reject(error);
            }
        });

    }
}