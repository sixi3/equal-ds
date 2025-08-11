import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: { disableTelemetry: true },
  viteFinal: async (cfg) => {
    cfg.optimizeDeps = cfg.optimizeDeps ?? {}
    cfg.optimizeDeps.esbuildOptions = {
      ...(cfg.optimizeDeps.esbuildOptions ?? {}),
      target: 'es2020',
    }
    return cfg
  },
}

export default config


