/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import { md3 } from 'vuetify/blueprints';

// Composables
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import { mdiDarkTheme, mdiLightTheme } from '@/plugins/themeMdiDefault';



// Local Storage
import { useLocalStorage }    from "@vueuse/core";

// Locales
import { fr } from 'vuetify/locale';

// Constant
import {KEY_USERPREF_THEME, VALUE_USERPREF_THEME_DEFAULT } from "@/store/UserPrefsStore";

// Type
import type {App} from "vue";

// Load Conf
const defaultTheme = useLocalStorage(KEY_USERPREF_THEME,VALUE_USERPREF_THEME_DEFAULT);

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export const vuetify= createVuetify({
  blueprint: md3,
  locale: {
     locale: 'fr',
     fallback: 'fr',
    messages: { fr }
   // adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    cspNonce: 'dQw4w9WgXcQ',
    defaultTheme: defaultTheme.value,
    variations: {
      colors: ['primary', 'secondary', 'tertiary', 'surface'],
      lighten: 4,
      darken: 4,
    },
    themes: {
      dark: mdiDarkTheme,
      light: mdiLightTheme,
    },
  },
});

export default function registerVuetify(app: App): App {
  app.use(vuetify);
  return app;
}