import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config.mjs';



export default mergeConfig(
  viteConfig,
  defineConfig({
    setupFiles: ['./src/test/setup.ts'],
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      server: {
        deps: {
          inline: ["vuetify"],
        },
      },
      watch: false,
      reporters: ['junit', 'json',  'verbose', 'vitest-sonar-reporter'],
      outputFile: {
        junit: './target/vitest-junit-report.xml',
        json: './target/vitest-json-report.json',
        'vitest-sonar-reporter': 'target/vitest-sonar-report.xml',
      },
      // https://vitest.dev/guide/coverage
      coverage: {
        reporter: [ 'lcov', 'json', 'html' ],
        reportsDirectory:  './target/coverage',
      },

    },
  })
)
