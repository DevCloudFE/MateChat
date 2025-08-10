import fs from 'fs/promises';
import path from 'path';

// --- 配置 ---
// 将你的原始 SVG 文件放在这个目录
const inputDir = path.resolve(process.cwd(), 'packages/components/FileList/raw-icons');
// 生成的 Vue 组件将保存在这个目录
const outputDir = path.resolve(process.cwd(), 'packages/components/FileList/FileIcon');
const defaultSize = 32;
// --- 配置结束 ---

/**
 * 将字符串转换为大驼峰命名法 (PascalCase)
 * @param {string} str - 输入字符串 (e.g., 'my-icon' or 'my_icon')
 * @returns {string} - PascalCase 字符串 (e.g., 'MyIcon')
 */
function toPascalCase(str) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join('');
}

/**
 * 将单个 SVG 内容转换为 Vue 组件字符串
 * @param {string} svgContent - 原始 SVG 文件内容
 * @returns {string} - 格式化后的 Vue 组件内容
 */
function createVueComponent(svgContent) {
  // 提取 <svg> 标签及其内容
  const svgMatch = svgContent.match(/<svg([\s\S]*?)>([\s\S]*)<\/svg>/i);
  if (!svgMatch) {
    throw new Error('未在文件中找到有效的 <svg> 标签。');
  }

  let [, attributes, innerContent] = svgMatch;

  // 移除固定的 width 和 height 属性，保留 viewBox
  attributes = attributes.replace(/\s(width|height)="[^"]*"/g, '');

  const template = `
<script setup lang="ts">
const props = withDefaults(defineProps<{
  size?: number | string
  title?: string
  class?: string
}>(), {
  size: ${defaultSize}
})
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    ${attributes.trim()}
    role="img"
    :aria-label="props.title"
    :class="props.class"
  >
    ${innerContent.trim()}
  </svg>
</template>
`;
  return template.trim();
}

/**
 * 主函数
 */
async function run() {
  try {
    // 确保输入目录存在
    await fs.access(inputDir);
  } catch (error) {
    console.error(`❌ 错误：输入目录不存在，请先创建 "${inputDir}" 并放入 SVG 文件。`);
    await fs.mkdir(inputDir, { recursive: true });
    console.log(`ℹ️ 已自动创建输入目录: ${inputDir}`);
    return;
  }

  // 创建输出目录
  await fs.mkdir(outputDir, { recursive: true });

  const files = await fs.readdir(inputDir);
  const svgFiles = files.filter(file => file.toLowerCase().endsWith('.svg'));

  if (svgFiles.length === 0) {
    console.warn(`🟡 警告：在 "${inputDir}" 中没有找到 .svg 文件。`);
    return;
  }

  console.log(`🚀 开始转换 ${svgFiles.length} 个 SVG 文件...`);

  for (const file of svgFiles) {
    const componentName = toPascalCase(path.basename(file, '.svg'));
    const outputPath = path.join(outputDir, `${componentName}.vue`);
    
    try {
      const svgContent = await fs.readFile(path.join(inputDir, file), 'utf-8');
      const vueContent = createVueComponent(svgContent);
      await fs.writeFile(outputPath, vueContent, 'utf-8');
      console.log(`✅ 成功: ${file} -> ${componentName}.vue`);
    } catch (error) {
      console.error(`❌ 失败: ${file} - ${error.message}`);
    }
  }

  console.log('✨ 批量转换完成！');
}

run();