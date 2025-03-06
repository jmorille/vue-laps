<script lang="ts" setup>
  import DefaultView from '@/layouts/default/DefaultView.vue';
  import DefaultNavMenu from '@/layouts/default/DefaultNavMenu.vue';

  // Vue
  import { computed, ref } from 'vue'; 
  import { useI18n } from 'vue-i18n';
  // Store
  import { useAuthStore } from '@/store/AuthStore'; 
  import { useUserPrefsStore } from '@/store/UserPrefsStore';
  // Tools
  import { sanitizeUrl } from '@braintree/sanitize-url'; 


  // feature
  const { t } = useI18n();

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
      <v-app-bar
        color="surface-darken-1"
        border
      >
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        />

        <v-toolbar-title v-t="'app.title'" />
        <v-spacer />

        <router-view name="appbar" />
        <v-btn
          variant="text"
          :icon="darkLightIcon"
          @click="toggleTheme"
        />

        <v-btn
          id="menu-dots-vertical-activator"
          variant="text"
          icon="mdi-dots-vertical"
        />
        <v-menu activator="#menu-dots-vertical-activator">
          <v-list>
            <v-list-item
              v-if="auth.isAuthenticated"
              prepend-icon="mdi-logout"
              :href="authLogoutUrl"
            >
              <template #title> 
                <div>{{ t('app.logout') }}</div>
              </template>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        color="surface"
      >
        <default-nav-menu />
      </v-navigation-drawer>

      <v-main>
        <default-view />
      </v-main>
    </v-theme-provider>
  </v-app>
</template>
