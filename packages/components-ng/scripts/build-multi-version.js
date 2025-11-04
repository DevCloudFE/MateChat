const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 获取当前脚本所在目录
const scriptDir = path.dirname(__filename);
const packagesDir = path.resolve(scriptDir, '..');
const projectPkgPath = path.resolve(packagesDir, 'projects/components-ng/package.json');
const ngPackagePath = path.resolve(packagesDir, 'projects/components-ng/ng-package.json');

// 版本配置
const versions = {
  angular17: {
    '@angular/common': '^17.3.0',
    '@angular/core': '^17.3.0',
    outputDir: '../../dist/components-ng-17'
  },
  angular20: {
    '@angular/common': '^20.3.0',
    '@angular/core': '^20.3.0',
    outputDir: '../../dist/components-ng-20'
  }
};

/**
 * 构建指定版本的库
 * @param {string} versionType - 版本类型（angular17或angular20）
 */
function buildVersion(versionType) {
  console.log(`开始构建 ${versionType} 版本...`);
  let originalPeerDeps = null;
  let originalDest = null;
  
  try {
    // 读取原始package.json
    const pkgContent = fs.readFileSync(projectPkgPath, 'utf8');
    const pkg = JSON.parse(pkgContent);
    
    // 保存原始peerDependencies
    originalPeerDeps = { ...pkg.peerDependencies };
    
    // 更新peerDependencies版本
    const versionConfig = versions[versionType];
    pkg.peerDependencies['@angular/common'] = versionConfig['@angular/common'];
    pkg.peerDependencies['@angular/core'] = versionConfig['@angular/core'];
    
    // 写回package.json
    fs.writeFileSync(projectPkgPath, JSON.stringify(pkg, null, 2), 'utf8');
    console.log(`已更新 ${versionType} 版本的peerDependencies`);
    
    // 读取并修改ng-package.json中的输出目录
    const ngPackageContent = fs.readFileSync(ngPackagePath, 'utf8');
    const ngPackage = JSON.parse(ngPackageContent);
    originalDest = ngPackage.dest;
    ngPackage.dest = versionConfig.outputDir;
    fs.writeFileSync(ngPackagePath, JSON.stringify(ngPackage, null, 2), 'utf8');
    console.log(`已更新输出目录为: ${versionConfig.outputDir}`);
    
    // 执行构建命令
    console.log('开始构建库...');
    const buildCommand = 'ng build components-ng';
    console.log(`执行命令: ${buildCommand}`);
    execSync(buildCommand, { stdio: 'inherit', cwd: packagesDir });
    console.log(`构建 ${versionType} 版本成功！输出目录: ${path.resolve(packagesDir, versionConfig.outputDir)}`);
    
    // 恢复原始配置
    pkg.peerDependencies = originalPeerDeps;
    fs.writeFileSync(projectPkgPath, JSON.stringify(pkg, null, 2), 'utf8');
    
    ngPackage.dest = originalDest;
    fs.writeFileSync(ngPackagePath, JSON.stringify(ngPackage, null, 2), 'utf8');
    console.log('已恢复原始package.json和ng-package.json配置');
    
  } catch (error) {
    console.error(`构建 ${versionType} 版本失败:`, error);
    // 尝试恢复原始配置
    try {
      // 恢复package.json
      if (originalPeerDeps) {
        const pkg = JSON.parse(fs.readFileSync(projectPkgPath, 'utf8'));
        pkg.peerDependencies = originalPeerDeps;
        fs.writeFileSync(projectPkgPath, JSON.stringify(pkg, null, 2), 'utf8');
      }
      // 恢复ng-package.json
      if (originalDest) {
        const ngPackage = JSON.parse(fs.readFileSync(ngPackagePath, 'utf8'));
        ngPackage.dest = originalDest;
        fs.writeFileSync(ngPackagePath, JSON.stringify(ngPackage, null, 2), 'utf8');
      }
    } catch (revertError) {
      console.error('恢复原始配置失败:', revertError);
    }
    process.exit(1);
  }
}

/**
 * 主函数
 */
function main() {
  const versionArg = process.argv[2];
  
  if (versionArg && versions[versionArg]) {
    // 构建指定版本
    buildVersion(versionArg);
  } else {
    // 默认构建所有版本
    console.log('未指定版本，将构建所有版本...');
    Object.keys(versions).forEach(versionType => {
      buildVersion(versionType);
    });
    console.log('所有版本构建完成！');
  }
}

// 执行主函数
main();