import fs from 'fs-extra';
import { ignoreDirs, componentsDir, componentIndexFile } from './const.js';
import { resolveFilesInfo, parseExport, createIndexTemplate } from './utils.js';

function generateComponent() {
  const exportModules = [];
  const filesInfo = resolveFilesInfo(componentsDir, ignoreDirs);

  filesInfo.forEach((item) => {
    exportModules.push(parseExport(item));
  });

  const template = createIndexTemplate(exportModules);

  fs.writeFile(componentIndexFile, template, 'utf-8');
}

generateComponent();
