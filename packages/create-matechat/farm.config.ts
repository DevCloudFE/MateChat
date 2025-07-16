import { defineConfig } from '@farmfe/core';

export default defineConfig({
  compilation: {
    input: {
      index: './src/index.ts',
    },
    output: {
      path: './dist',
      targetEnv: 'library-node',
      format: 'esm',
    },
    minify: false,
    sourcemap: false,
    external: ['archons', 'chalk'],
  },
  plugins: [
    {
      name: 'matechat:shebang',
      finalizeResources: {
        executor: async ({ resourcesMap }) => {
          for (const resource of Object.values(resourcesMap)) {
            if (
              resource.resourceType === 'js' &&
              resource.origin.type === 'ResourcePot'
            ) {
              const content = new TextDecoder().decode(
                Buffer.from(resource.bytes),
              );
              if (!content.startsWith('#!/usr/bin/env node')) {
                resource.bytes = Buffer.from(
                  `#!/usr/bin/env node\n${content}`,
                ).toJSON().data;
              }
            }
          }
          return resourcesMap;
        },
      },
    },
  ],
});
