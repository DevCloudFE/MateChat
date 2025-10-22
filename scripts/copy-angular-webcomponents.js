import fs from 'fs-extra';
import path from 'path';

// 源目录和目标目录
const sourceDir = path.resolve('packages/components-ng/dist/components-ng/web-components');
const targetDir = path.resolve('docs/public/angular-webcomponents');
// demo文件源目录和目标目录
const demoSourceDir = path.resolve('packages/components-ng/projects/demo-app/src/app');
const demoTargetDir = path.resolve('docs/public/demo');

console.log('开始复制Angular Web Components...');
console.log(`源目录: ${sourceDir}`);
console.log(`目标目录: ${targetDir}`);

async function copyWebComponents() {
  try {
    // 确保目标目录存在
    await fs.ensureDir(targetDir);
    
    // 检查源目录是否存在，如果不存在则创建
    if (!await fs.pathExists(sourceDir)) {
      console.log(`源目录不存在，正在创建: ${sourceDir}`);
      await fs.ensureDir(sourceDir);
      console.log(`源目录创建成功: ${sourceDir}`);
    }
    
    // 复制所有文件
    await fs.copy(sourceDir, targetDir, {
      overwrite: true,
      recursive: true
    });
    
    console.log('✅ Angular Web Components 复制成功！');
    
    // 复制demo文件
    await copyDemoFiles();
  } catch (error) {
    console.error('❌ 复制Angular Web Components失败:', error.message);
    process.exit(1);
  }
}

// 复制demo文件到docs/public/demo目录
async function copyDemoFiles() {
  console.log('开始复制demo文件到docs/public/demo...');
  console.log(`demo源目录: ${demoSourceDir}`);
  console.log(`demo目标目录: ${demoTargetDir}`);
  
  try {
    // 确保目标目录存在
    await fs.ensureDir(demoTargetDir);
    
    // 检查源目录是否存在
    if (!await fs.pathExists(demoSourceDir)) {
      console.log(`⚠️ demo源目录不存在: ${demoSourceDir}`);
      return;
    }
    
    // 复制所有文件和子目录
    await fs.copy(demoSourceDir, demoTargetDir, {
      overwrite: true,
      recursive: true
    });
    
    console.log('✅ Demo文件复制成功！');
  } catch (error) {
    console.error('❌ 复制Demo文件失败:', error.message);
    throw error;
  }
}

// 执行复制操作
copyWebComponents();