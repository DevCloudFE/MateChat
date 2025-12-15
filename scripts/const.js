import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const indexFileName = 'index.ts';
export const ignoreDirs = ['PopperTrigger', 'node_modules', 'dist'];
export const componentsDir = path.resolve(__dirname, '../packages/components');
export const componentsTypingsDir = path.resolve(__dirname, '../packages/components/typings');
export const componentIndexFile = path.resolve(componentsDir, `./${indexFileName}`);
export const componentTsconfigFile = path.resolve(componentsDir, `./tsconfig.build.json`);
export const buildLibOutputDir = path.resolve(__dirname, '../packages/components/dist');
export const buildLibOutputIndexFile = path.resolve(buildLibOutputDir, './mate-chat.js');
