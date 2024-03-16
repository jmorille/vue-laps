import axios from 'axios';

// Types
import type { App } from 'vue';
import type { InternalAxiosRequestConfig } from 'axios';
import type { VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js/dist/types';

// Config Global
//axios.defaults.withCredentials = true;

/**
 * Add Keycloak Token to the Request Call
 * @param vueKeycloak The Keycloak Instance
 */
function keycloakTokenInterceptor(
  vueKeycloak?: VueKeycloakInstance
): (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig {
  return (config: InternalAxiosRequestConfig) => {
    const token = vueKeycloak?.token;
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
      config.headers['Cookie'] = `auth_token=${token}`;
    } else {
      console.error('No  keycloak Token');
    }
    return config;
  };
}

/**
 * Axios Error Handler
 */
function handlerAxiosError(): (error: any) => any {
  return (error: any) => {
    console.error(`Axios Error ${error}`);
    return Promise.reject(error);
  };
}

/**
 * Axios Global Config Interceptor
 * @param vueKeycloak The Keycloak Instance
 */
export function configAxiosInterceptor(vueKeycloak?: VueKeycloakInstance) {
  axios.interceptors.request.use(
    keycloakTokenInterceptor(vueKeycloak), // Add Access token
    handlerAxiosError() // Maanger Error
  );
}

/**
 * Axios Plugin to expose to Vue
 * @param app
 */
export default function registerVueAxios(app: App): App {
  app.provide('axios', axios);
  return app;
}
