// Libs
import { defineStore } from 'pinia';
import { computed, inject, ref, toRefs, watch } from 'vue';
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';

// Type
import type { Ref } from 'vue';
import type { KeycloakProfile } from 'keycloak-js';
import type { Logger, RootLogger } from 'loglevel';
import type {  VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js';
import type { KeycloakError, KeycloakProfile } from 'keycloak-js/lib/keycloak';

// Constant
const keycloakSymbol = VueKeyCloak.KeycloakSymbol;

export const useAuthStore = defineStore('auth', () => {
  const logger: Logger = (inject('logger') as RootLogger).getLogger('AuthStore');

  const keycloak: VueKeycloakInstance = useKeycloak(); 
  // User Profile
  const profile: Ref<KeycloakProfile | undefined> = ref();

  // Config Computed
  const isAuthenticated = computed(() => keycloak!.authenticated);
  const username = computed(() => keycloak!.userName);
  const authAccountUrl = computed(() => keycloak?.value?.createAccountUrl());
  const authLogoutUrl = computed(() => keycloak?.value?.createLogoutUrl());
  const isAuthenticatedUser = computed(() => keycloak?.value?.hasResourceRole('user'));

  const isAuthenticatedAdmin = computed(() => keycloak?.value?.hasResourceRole('admin'));

  // Profile Computed Data
  const email = computed(() => profile.value?.email);
  const firstName = computed(() => profile.value?.firstName);
  const lastName = computed(() => profile.value?.lastName);

  // Avatar
  const avatar: Ref<string | undefined> = ref();

  watch(isAuthenticated, async (newisAuthenticated) => {
    console.log(`Watch change for isAuthenticated: ${newisAuthenticated}`);
    if (newisAuthenticated) {
      await getUserProfile();
    } else {
      profile.value = undefined;
    }
  });

  // Acount http://keycloak.localhost/realms/intranet/account/#/
  async function getUserProfile() {
    if (!keycloak?.value) {
      avatar.value = undefined;
      profile.value = undefined;
      return undefined;
    }
    const userProfile: KeycloakProfile | undefined = await keycloak.value
      .loadUserProfile()
      .catch((err: KeycloakError) => {
        logger.error(err);
        return undefined;
      });
    profile.value = userProfile;

    // Avatar
    const profileAvatar = userProfile?.attributes?.avatar;
    if (profileAvatar) {
        avatar.value =  Array.isArray(profileAvatar)? profileAvatar[0] as string: profileAvatar  as string;
    }
    return profile;
  }

  //  function logout() {
  //    return keycloak.logout();
  //  }

  return {
    authAccountUrl,
    authLogoutUrl,
    isAuthenticated, isAuthenticatedUser, isAuthenticatedAdmin,
    profile,
    username,
    email,
    firstName,
    lastName,
    avatar,
    getUserProfile,
  };
});
