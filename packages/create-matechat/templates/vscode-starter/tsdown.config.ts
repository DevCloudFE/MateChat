import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/extension.ts',
  platform: 'node',
  outDir: 'dist',
  external: 'vscode',
  sourcemap: true,
  format: 'cjs',
  name: 'matechat',
  failOnWarn: true,
});
