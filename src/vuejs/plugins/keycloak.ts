// Lib
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js';

// Config
import { configAxiosInterceptor } from '@/plugins/vueAxios';
import {keycloakInitOptions} from "@/plugins/config";  

// Types
import type Keycloak from 'keycloak-js/lib/keycloak';
import type {  KeycloakError } from 'keycloak-js/lib/keycloak';
import type { App } from 'vue';
import type {
  VueKeycloakInstance,
  VueKeycloakOptions,
} from '@dsb-norge/vue-keycloak-js';



/**
 *
 * Vue Keycloak JS Plugin Configuration
 *
 * @param onReadyCallback External Callback When Keyclaok Ready
 * @param onInitErrorCallback External Callback When Keycloak Init Error
 */
function getKeycloakOps( onReadyCallback?: (keycloak: Keycloak, vueKeycloak?: VueKeycloakInstance) => void,
                         onInitErrorCallback?: (error: Error, err: KeycloakError) => void
                         ): VueKeycloakOptions {
  const keycloakOpts: VueKeycloakOptions = {
    init: keycloakInitOptions,
  //  config,
    onReady(keycloak: Keycloak, vueKeycloak?: VueKeycloakInstance) {
      configAxiosInterceptor(vueKeycloak);
      // Add External Callback On Ready
      if (onReadyCallback) {
        onReadyCallback(keycloak, vueKeycloak);
      }
    },
    onInitError(error: Error, err: KeycloakError) {
      console.error('Init Keycloak Error', error, err);
      if (onInitErrorCallback) {
        onInitErrorCallback(error, err);
      }
    },
    onAuthRefreshError(keycloak: Keycloak) {
      console.error(`Auth Refresh Keycloak Error ${keycloak.authServerUrl}`);
    },
  };
  return keycloakOpts;
}

/**
 * Register the Keycloak Service
 * @param app The VueJs App
 * @param onReadyCallbach External Callback When Keyclaok Ready
 */
export default function registerKeycloak(app: App,
                                         onReadyCallback?: (keycloak: Keycloak, vueKeycloak?: VueKeycloakInstance) => void,
                                         onInitErrorCallback?: (error: Error, err: KeycloakError) => void
): App {
  const keycloakOpts = getKeycloakOps(onReadyCallback, onInitErrorCallback);
  app.use(VueKeycloakJs, keycloakOpts);
  return app;
}
