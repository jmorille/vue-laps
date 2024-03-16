// Lib
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js';

// Config
import type Keycloak from 'keycloak-js';
import { configAxiosInterceptor } from '@/plugins/vueAxios';

// Types
import type { App } from 'vue';
import type {
  KeycloakError,
  VueKeycloakInstance,
  VueKeycloakOptions,
} from '@dsb-norge/vue-keycloak-js/dist/types';


// Keycloak Configuration Flow
import {keycloakInitOptions} from "@/plugins/config";

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
