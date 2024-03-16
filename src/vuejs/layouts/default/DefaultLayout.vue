<script lang="ts" setup>
  import DefaultView from '@/layouts/default/DefaultView.vue';
  import DefaultNavMenu from '@/layouts/default/DefaultNavMenu.vue';

  import { computed, ref } from 'vue';
  import { useAuthStore } from '@/store/AuthStore';
  import { useUserPrefsStore } from '@/store/UserPrefsStore';
  import { sanitizeUrl } from '@braintree/sanitize-url';

  // Init
  const drawer = ref(true);

  // Store
  const userPrefs = useUserPrefsStore();
  const auth = useAuthStore();

  // Theme
  function toggleTheme() {
    return userPrefs.toggleTheme();
  }

  const authLogoutUrl = computed( () => sanitizeUrl(auth.authLogoutUrl));
  const darkLightIcon = computed(() => (userPrefs.isThemeDark() ? 'mdi-weather-sunny' : 'mdi-weather-night'));

</script>

<template>
  <v-app>
    <v-theme-provider>
      <v-app-bar color="surface-darken-1" border>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title v-t="'app.title'"></v-toolbar-title>
        <v-spacer></v-spacer>

        <router-view name="appbar"></router-view>
        <v-btn variant="text" :icon="darkLightIcon" @click="toggleTheme"></v-btn>

        <v-btn variant="text" icon="mdi-dots-vertical" id="menu-dots-vertical-activator"></v-btn>
        <v-menu activator="#menu-dots-vertical-activator">
          <v-list>
            <v-list-item prepend-icon="mdi-logout" v-bind:href="authLogoutUrl" v-if="auth.isAuthenticated">
              <template v-slot:title>
                <div v-t="'app.logout'"></div>
              </template>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" color="surface">
        <default-nav-menu></default-nav-menu>
      </v-navigation-drawer>

      <v-main>
        <default-view />
      </v-main>
    </v-theme-provider>
  </v-app>
</template>
