import { createI18n } from 'vue-i18n';
import dayjs from 'dayjs';

// Locales
import 'dayjs/locale/fr';

import messages from '@intlify/unplugin-vue-i18n/messages';


// Types
import type { I18nOptions } from 'vue-i18n';
import type {App} from "vue";

const opts: I18nOptions = {
  legacy: false,
  globalInjection: true,
  locale: 'fr',
  fallbackLocale: 'fr',
  messages
};

// Config day JS
dayjs.locale('fr');
export const i18n = createI18n(opts);

export default function registerVueI18n(app: App): App {
   app.use(i18n);
   console.log(JSON.stringify(messages));
   return app;
}