import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const config: StorybookConfig = {
  stories: ['../../../packages/ui/src/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  core: { disableTelemetry: true },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: fromRoot('../tsconfig.json'),
      include: [fromRoot('../../../packages/ui/src/**/*.tsx')],
      exclude: ['**/*.stories.tsx', '**/node_modules/**'],
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => !prop.parent?.fileName.includes('node_modules')
    }
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      resolve: {
        // Read the same assets as package consumers, without a prerequisite build.
        alias: [
          { find: '@gpmh/tokens/tokens.css', replacement: fromRoot('../../../packages/tokens/src/tokens.css') },
          { find: '@gpmh/ui/styles.css', replacement: fromRoot('../../../packages/ui/src/styles.css') },
          { find: /^@gpmh\/ui$/, replacement: fromRoot('../../../packages/ui/src/index.ts') }
        ],
        dedupe: ['react', 'react-dom']
      }
    });
  }
};

export default config;
