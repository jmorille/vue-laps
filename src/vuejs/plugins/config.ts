// App Config
import type {KeycloakInitOptions} from "@dsb-norge/vue-keycloak-js/dist/types";

/**
 * Keycloak Configuration Flow
 */
export const keycloakInitOptions: KeycloakInitOptions = {
    useNonce: true,
    flow: 'standard', // default
    checkLoginIframe: false, // default
    onLoad: 'login-required', // 'check-sso', //
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    scope: 'openid profile'
};
