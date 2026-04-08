#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.join(__dirname, '..');

const SKILLS = {
  vue: {
    skillDir: path.join(PROJECT_ROOT, '.trae/skills/matechat-vue'),
    referencesDir: path.join(PROJECT_ROOT, '.trae/skills/matechat-vue/references'),
    componentsDir: path.join(PROJECT_ROOT, '.trae/skills/matechat-vue/references/components'),
    docsComponentsDir: path.join(PROJECT_ROOT, 'docs/components'),
    docsUseGuideDir: path.join(PROJECT_ROOT, 'docs/use-guide'),
    name: 'MateChat Vue'
  },
  ng: {
    skillDir: path.join(PROJECT_ROOT, '.trae/skills/matechat-ng'),
    referencesDir: path.join(PROJECT_ROOT, '.trae/skills/matechat-ng/references'),
    componentsDir: path.join(PROJECT_ROOT, '.trae/skills/matechat-ng/references/components'),
    docsComponentsDir: path.join(PROJECT_ROOT, 'docs/components-ng'),
    docsUseGuideDir: path.join(PROJECT_ROOT, 'docs/use-guide-ng'),
    name: 'MateChat Angular'
  }
};

const SKILL_DIR = SKILLS.vue.skillDir;
const REFERENCES_DIR = SKILLS.vue.referencesDir;
const REFERENCES_COMPONENTS_DIR = SKILLS.vue.componentsDir;
const DOCS_COMPONENTS_DIR = SKILLS.vue.docsComponentsDir;
const DOCS_USE_GUIDE_DIR = SKILLS.vue.docsUseGuideDir;

console.log('🔄 Updating MateChat Vue Skill Documentation...\n');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyComponentDocs(skillConfig) {
  console.log(`📁 Copying component documentation from ${skillConfig.docsComponentsDir}...`);
  
  if (!fs.existsSync(skillConfig.docsComponentsDir)) {
    console.error(`❌ Error: ${skillConfig.docsComponentsDir} directory not found`);
    console.log('💡 Make sure you are running this script from the MateChat repository root');
    return 0;
  }

  ensureDir(skillConfig.componentsDir);

  const components = fs.readdirSync(skillConfig.docsComponentsDir).filter(file => {
    const filePath = path.join(skillConfig.docsComponentsDir, file);
    return fs.statSync(filePath).isDirectory();
  });

  console.log(`Found ${components.length} components to update:\n`);

  components.forEach(component => {
    const sourceDir = path.join(skillConfig.docsComponentsDir, component);
    const targetDir = path.join(skillConfig.componentsDir, component);
    
    ensureDir(targetDir);

    const files = fs.readdirSync(sourceDir);
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const sourceFile = path.join(sourceDir, file);
        const targetFile = path.join(targetDir, file);
        
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`  ✓ components/${component}/${file}`);
      }
    });
  });

  console.log(`\n✅ ${skillConfig.name} component documentation update completed!`);
  console.log(`📊 Updated ${components.length} components`);
  return components.length;
}

function copyUseGuideDocs(skillConfig) {
  console.log(`\n📖 Copying use-guide documentation from ${skillConfig.docsUseGuideDir}...`);
  
  if (!fs.existsSync(skillConfig.docsUseGuideDir)) {
    console.error(`❌ Error: ${skillConfig.docsUseGuideDir} directory not found`);
    return 0;
  }

  const targetDir = path.join(skillConfig.referencesDir, 'use-guide');
  ensureDir(targetDir);

  const files = fs.readdirSync(skillConfig.docsUseGuideDir).filter(file => file.endsWith('.md'));
  
  console.log(`Found ${files.length} guide files to update:\n`);

  files.forEach(file => {
    const sourceFile = path.join(skillConfig.docsUseGuideDir, file);
    const targetFile = path.join(targetDir, file);
    
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`  ✓ use-guide/${file}`);
  });

  const subDirs = ['cli', 'model', 'skills'];
  subDirs.forEach(subDir => {
    const sourceSubDir = path.join(skillConfig.docsUseGuideDir, subDir);
    if (fs.existsSync(sourceSubDir)) {
      const targetSubDir = path.join(targetDir, subDir);
      ensureDir(targetSubDir);
      
      const subFiles = fs.readdirSync(sourceSubDir).filter(file => file.endsWith('.md'));
      subFiles.forEach(file => {
        const sourceFile = path.join(sourceSubDir, file);
        const targetFile = path.join(targetSubDir, file);
        
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`  ✓ use-guide/${subDir}/${file}`);
      });
    }
  });

  console.log(`\n✅ ${skillConfig.name} use-guide documentation update completed!`);
  return files.length;
}

function updateFromGitHub() {
  console.log('🌐 Attempting to update from GitHub repository...');
  
  try {
    const tempDir = path.join(__dirname, '.temp-docs');
    
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true });
    }
    
    console.log('📥 Cloning MateChat repository...');
    execSync('git clone --depth 1 --filter=blob:none --sparse https://github.com/DevCloudFE/MateChat.git .temp-docs', {
      cwd: __dirname,
      stdio: 'inherit'
    });
    
    execSync('git sparse-checkout set docs/components docs/use-guide', {
      cwd: tempDir,
      stdio: 'inherit'
    });
    
    const componentsDir = path.join(tempDir, 'docs/components');
    const useGuideDir = path.join(tempDir, 'docs/use-guide');
    
    if (fs.existsSync(componentsDir)) {
      ensureDir(REFERENCES_COMPONENTS_DIR);
      
      const components = fs.readdirSync(componentsDir);
      
      components.forEach(component => {
        const componentDir = path.join(componentsDir, component);
        if (fs.statSync(componentDir).isDirectory()) {
          const targetDir = path.join(REFERENCES_COMPONENTS_DIR, component);
          ensureDir(targetDir);
          
          const files = fs.readdirSync(componentDir);
          files.forEach(file => {
            if (file.endsWith('.md')) {
              fs.copyFileSync(
                path.join(componentDir, file),
                path.join(targetDir, file)
              );
            }
          });
        }
      });
      
      console.log('✅ Successfully updated components from GitHub');
    }

    if (fs.existsSync(useGuideDir)) {
      const targetDir = path.join(REFERENCES_DIR, 'use-guide');
      ensureDir(targetDir);
      
      const files = fs.readdirSync(useGuideDir).filter(file => file.endsWith('.md'));
      files.forEach(file => {
        fs.copyFileSync(
          path.join(useGuideDir, file),
          path.join(targetDir, file)
        );
      });
      
      console.log('✅ Successfully updated use-guide from GitHub');
    }
    
    fs.rmSync(tempDir, { recursive: true });
    
  } catch (error) {
    console.error('❌ Failed to update from GitHub:', error.message);
    console.log('💡 Falling back to local documentation...');
    copyComponentDocs();
    copyUseGuideDocs();
  }
}

const args = process.argv.slice(2);
const useGitHub = args.includes('--github') || args.includes('-g');
const targetSkill = args.find(arg => arg === '--vue' || arg === '--ng')?.replace('--', '');

if (useGitHub) {
  updateFromGitHub();
} else {
  const skillsToUpdate = targetSkill ? [targetSkill] : Object.keys(SKILLS);
  
  skillsToUpdate.forEach(skillKey => {
    const skillConfig = SKILLS[skillKey];
    if (!skillConfig) {
      console.error(`❌ Unknown skill: ${skillKey}`);
      return;
    }
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📚 Updating ${skillConfig.name} Skill Documentation`);
    console.log('='.repeat(60));
    
    copyComponentDocs(skillConfig);
    copyUseGuideDocs(skillConfig);
  });
}

console.log('\n📚 Documentation structure:');
console.log('   .trae/skills/matechat-vue/references/');
console.log('   ├── components/');
console.log('   │   ├── attachment/');
console.log('   │   ├── bubble/');
console.log('   │   ├── input/');
console.log('   │   └── ... (other components)');
console.log('   └── use-guide/');
console.log('');
console.log('   .trae/skills/matechat-ng/references/');
console.log('   ├── components/');
console.log('   │   ├── attachment/');
console.log('   │   ├── bubble/');
console.log('   │   ├── input/');
console.log('   │   └── ... (other components)');
console.log('   └── use-guide/');
console.log('\n💡 Usage:');
console.log('   npm run update-skill-docs              # Update all skills');
console.log('   npm run update-skill-docs -- --vue     # Update only Vue skill');
console.log('   npm run update-skill-docs -- --ng      # Update only Angular skill');
console.log('   npm run update-skill-docs -- --github  # Update from GitHub');
