const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 定义源目录和目标目录
const scriptsDir = path.dirname(__filename);
const componentsNgDir = path.resolve(scriptsDir, '../');
const demoAppDir = path.resolve(componentsNgDir, 'projects/demo-app');
const sourceDir = path.resolve(componentsNgDir, 'projects/demo-app/src/app');
const targetDir = path.resolve(componentsNgDir, 'projects/demo-app/src/assets/demo');

console.log('开始复制demo文件...');
console.log(`源目录: ${sourceDir}`);
console.log(`目标目录: ${targetDir}`);

// 确保目标目录存在
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`创建目录: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 复制文件和目录
function copyDir(source, target) {
  // 确保目标目录存在
  ensureDirExists(target);

  // 读取源目录内容
  const files = fs.readdirSync(source);

  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    const stats = fs.statSync(sourcePath);
    
    if (stats.isDirectory()) {
      // 递归复制子目录
      copyDir(sourcePath, targetPath);
    } else {
      // 复制文件
      console.log(`复制文件: ${sourcePath} -> ${targetPath}`);
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

// 执行复制操作
try {
  // 进入demo-app目录
  process.chdir(demoAppDir);
  console.log(`当前工作目录: ${process.cwd()}`);
  
  // 检查源目录是否存在
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`源目录不存在: ${sourceDir}`);
  }
  
  // 复制文件
  copyDir(sourceDir, targetDir);
  
  console.log('✓ 文件复制完成！');
} catch (error) {
  console.error('✗ 文件复制失败:', error.message);
  process.exit(1);
}