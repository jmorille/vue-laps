// Composables
import {createRouter, createWebHistory} from 'vue-router';

import {inject} from "vue";
import VueKeyCloak from "@dsb-norge/vue-keycloak-js";

// Type
//import type {Logger, RootLogger} from "loglevel";
import type { VueKeycloakInstance } from "@dsb-norge/vue-keycloak-js/dist/types";
import type { RouteRecordRaw } from 'vue-router';

// Constant
const keycloakSymbol = VueKeyCloak.KeycloakSymbol;


const routes: RouteRecordRaw[] = [


  {
    path: '/',
    component: () => import('@/layouts/default/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
      },
    ],
//    meta: { allowAnonymous: true, },
  },

  {
    path: '/servers',
    component: () => import('@/layouts/default/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Servers',
        components: {
          default: () => import('@/views/ServerView.vue'),
          appbar: () => import('@/components/servers/ServerAppBar.vue'),
        },
      },
    ],
  },
  {
    path: '/password',
    component: () => import('@/layouts/default/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'PasswordSearch',
        components: {
          default: () => import('@/views/PasswordSearch.vue'),
        },
      },
      {
        path: ':hostname',
        name: 'PasswordView',
        components: {
          default: () => import('@/views/PasswordView.vue'),
        },
        props: true,
      },
    ],
  },

  {
    path: '/about',
    component: () => import('@/layouts/default/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
      },
    ],
  },

  {
    path: '/forbidden',
    component: () => import('@/layouts/default/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Forbidden',
        component: () => import('@/views/error/ForbiddenView.vue'),
      },
    ],
    meta: {
      allowAnonymous: true,
    },
  },

  {
    path: '/:catchAll(.*)',
    component: () => import('@/layouts/default/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'notfound',
        component: () => import('@/views/error/NotFoundView.vue'),
      },
    ],
    meta: {
      allowAnonymous: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


/**
 * Sécurity Guard
 */
router.beforeEach((to) => {
  if (!to.meta.allowAnonymous ) {
      //const logger: Logger = (inject('logger') as RootLogger).getLogger('Router');
      const keycloak = inject(keycloakSymbol) as VueKeycloakInstance;
      const isAuthenticated = keycloak.authenticated;
      if (!isAuthenticated ) {
        //logger.info(`[rooter] isAuthenticated=${isAuthenticated} to=${to.path}`);

        if (keycloak.createLoginUrl) {
          const redirectUri = window.location.origin + to.path;
          const keycloakLoginUrl =  keycloak.createLoginUrl({ redirectUri });
          //logger.info(`Redirect To=${redirectUri} with=${keycloakLoginUrl}`);
          window.location.replace(keycloakLoginUrl);
        } else {
          // This should never occur
          //logger.error(`No createLoginUrl: Keycloak ready=${keycloak.ready}`);
          router.push( {name:'Home', replace: true });
        }
      } else if (keycloak.hasResourceRole && keycloak.hasResourceRole("user"))  {
        //console.log(`[rooter] resourceAccess=${JSON.stringify(keycloak.resourceAccess)} to=${to.path}`);
        //logger.info(`[rooter] isUser Authenticated=${isAuthenticated} to=${to.path}`);
      } else {
        //logger.info(`[rooter] Redirect Forbidden instead of path to=${to.path}`);
        router.push( {name:'Forbidden', replace: true });
      }
  }

  // explicitly return false to cancel the navigation
  return true;
});

export default router;
