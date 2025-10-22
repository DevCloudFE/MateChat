export class BaseShowComponent {
    async loadFiles(urls: Array<{ type: string; path: string }>): Promise<Array<{ type: string; code: string }>> {
        return new Promise(async (resolve, reject) => {
            try {
                const sourceCode: Array<{ type: string; code: string }> = [];
                for (const url of urls) {
                    const response = await fetch(url.path);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${url.type} file: ${response.status}`);
                    }
                    const code = await response.text();
                    sourceCode.push({ type: url.type, code });
                }
                resolve(sourceCode);
            } catch (error) {
                reject(error);
            }
        });

    }
}