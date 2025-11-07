import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const release = () => {
  const packageSourceFile = path.resolve(__dirname, '../packages/components/package.json');
  const packageTargetFile = path.resolve(__dirname, '../packages/components/dist/package.json');
  const readmeSourceFile = path.resolve(__dirname, '../packages/components/README.md');
  const readmeTargetFile = path.resolve(__dirname, '../packages/components/dist/README.md');

  const packageJson = JSON.parse(fs.readFileSync(packageSourceFile, 'utf-8'));
  // 直接删除devDependencies属性，因为包含workspace:的依赖都在其中
  delete packageJson.devDependencies;
  // 将修改后的JSON对象写回文件
  fs.writeFileSync(packageTargetFile, JSON.stringify(packageJson, null, 2), 'utf-8');
  
  // 复制 README.md 文件
  fs.copySync(readmeSourceFile, readmeTargetFile);
};

release();
