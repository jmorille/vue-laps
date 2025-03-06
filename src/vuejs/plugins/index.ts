/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Types
import type { App } from 'vue';

// Plugins
import registerVueI18n from '@/plugins/vueI18n'; 
import registerVueAxios from '@/plugins/vueAxios';
import registerKeycloak from '@/plugins/keycloak';
import registerVueRouter from "@/plugins/vueRouter";
import registerVuePinia from "@/plugins/vuePinia";
import registerVuetify from '@/plugins/vuetify';

// Type
import type {  KeycloakError } from 'keycloak-js/lib/keycloak';
import registerLogger from './logger';

function getPromisePlugins(app: App) {
  return Promise.resolve().then(() => {
    registerLogger(app);
    registerVueAxios(app);
    registerVueI18n(app);
    registerVuePinia(app);
    registerVuetify(app);
    return app;
  });
}

function getPromiseKeycloak(app: App) {
  return new Promise((resolve, reject) => {
    registerKeycloak(app, () => {
      resolve(app);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }, (error: Error, err: KeycloakError) => {
      reject(error);
    });
  });
}

export function registerPlugins(app: App, appCallback?: (app: App) => void) {
  Promise.all( [
      getPromiseKeycloak(app),
      getPromisePlugins(app),
  ]) .then( () => {
     registerVueRouter(app);
    if (appCallback) {
      appCallback(app);
    }
    return app;
  });
}
