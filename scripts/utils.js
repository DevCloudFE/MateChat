import path from 'path';
import fs from 'fs-extra';
import traverse from '@babel/traverse';
import babelParser from '@babel/parser';
import { indexFileName } from './const.js';

export function resolveFilesInfo(targetDir, ignoreDirs = []) {
  return fs
    .readdirSync(targetDir)
    .filter((itemDir) => fs.statSync(path.resolve(targetDir, itemDir)).isDirectory() && !ignoreDirs.includes(itemDir))
    .map((itemDir) => ({ name: itemDir, indexPath: path.resolve(targetDir, itemDir, indexFileName) }));
}

export function parseExport(fileInfo) {
  const fileContent = fs.readFileSync(fileInfo.indexPath, 'utf-8');
  const ast = babelParser.parse(fileContent, {
    sourceType: 'module',
    plugins: ['typescript'],
  });
  const exportNames = [];
  const installer = 'Mc' + fileInfo.name;

  traverse.default(ast, {
    ExportNamedDeclaration({ node }) {
      if (node.specifiers.length) {
        node.specifiers.forEach((specifier) => {
          exportNames.push(specifier.local.name);
        });
      } else if (node.declaration) {
        if (node.declaration.declarations) {
          node.declaration.declarations.forEach((dec) => {
            exportNames.push(dec.id.name);
          });
        } else if (node.declaration.id) {
          exportNames.push(node.declaration.id.name);
        }
      }
    },
  });

  return { installer, exportNames, dirName: fileInfo.name };
}

export function createIndexTemplate(exportModules) {
  const exportComponents = [];
  const imports = [];
  const installs = [];

  exportModules.forEach((item) => {
    const { installer, exportNames, dirName } = item;
    const importStr = `import { ${exportNames.join(', ')} } from './${dirName}';`;

    imports.push(importStr);
    installs.push(installer);
    exportComponents.push(...exportNames);
  });

  const template = `\
${imports.join('\n')}

const installs = [
  ${installs.join(',\n  ')}
];

export {
  ${exportComponents.join(',\n  ')}
};

export default {
  install(app) {
    installs.forEach((p) => app.use(p));
  }
};
`;

  return template;
}
