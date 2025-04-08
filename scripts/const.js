import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const indexFileName = 'index.ts';
export const ignoreDirs = ['PopperTrigger', 'node_modules', 'dist'];
export const componentsDir = path.resolve(__dirname, '../packages/components');
export const componentIndexFile = path.resolve(componentsDir, `./${indexFileName}`);
export const buildLibOutputDir = path.resolve(__dirname, '../packages/components/dist');
export const buildLibOutputIndexFile = path.resolve(buildLibOutputDir, './mate-chat.js');
export const buildLibOutputIndexDtsFile = path.resolve(buildLibOutputDir, './index.d.ts');
