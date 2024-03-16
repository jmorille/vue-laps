import log from 'loglevel';

// Types
import type { Plugin, App } from 'vue';
import type { RootLogger } from 'loglevel';
import type { LoglevelPluginPrefixOptions } from 'loglevel-plugin-prefix';
import * as prefix from 'loglevel-plugin-prefix';

// Export
const prefixOptions: LoglevelPluginPrefixOptions = {
  format: (level: string, logger: string | undefined, timestamp: Date) => {
    return JSON.stringify({ timestamp, log: { level, logger } }) + ' - ';
  },
};

const loggerPlugin: Plugin = {
  install: (app) => {
    // Config loglevel
    const logger: RootLogger = log;
    logger.setLevel('info');
    // Config Pluling prefix
    prefix.reg(logger);
    prefix.apply(logger, prefixOptions);
    // @ts-ignore
    app.config.globalProperties.$logger = logger.noConflict();
    app.provide('logger', logger);
  },
};

export default function registerLogger(app: App): App {
  app.use(loggerPlugin);
  return app;
}
