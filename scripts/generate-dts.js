import path from "node:path";
import execa from "execa";
import fs from "fs-extra";
import {
  componentTsconfigFile,
  componentsTypingsDir,
  buildLibOutputDir,
} from "./const.js";

async function generateDts() {
  try {
    await execa("vue-tsc", ["-p", componentTsconfigFile]);
  } catch (error) {
    console.log(error);
  }

  replaceFilePath();
  copyDtsToBuild();
  deleteTypings();
}

function replaceFilePath() {
  fs.readdirSync(componentsTypingsDir)
    .filter((itemDir) =>
      fs.statSync(path.resolve(componentsTypingsDir, itemDir)).isDirectory(),
    )
    .forEach((name) => {
      const indexDir = path.resolve(componentsTypingsDir, name, "index.d.ts");
      const indexContent = fs
        .readFileSync(indexDir, { encoding: "utf-8" })
        .replaceAll(".vue", ".vue.ts");
      fs.outputFileSync(indexDir, indexContent, "utf-8");
    });
}

function copyDtsToBuild() {
  fs.readdirSync(componentsTypingsDir).forEach((name) => {
    const curDir = path.resolve(componentsTypingsDir, name);
    const targetDir = path.resolve(buildLibOutputDir, name);
    if (fs.statSync(curDir).isFile()) {
      fs.copyFileSync(curDir, targetDir);
      return;
    }

    fs.ensureDirSync(targetDir);
    fs.copySync(curDir, targetDir);
  });
}

function deleteTypings() {
  fs.removeSync(componentsTypingsDir);
}

generateDts();
