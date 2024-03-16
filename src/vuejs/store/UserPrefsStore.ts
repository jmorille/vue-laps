// Utilities
import { defineStore } from 'pinia';

// theme
import { useTheme } from 'vuetify';
import { useLocalStorage }    from "@vueuse/core";

export const KEY_USERPREF_THEME = 'userpref_theme';
export const VALUE_USERPREF_THEME_DEFAULT = 'light';

export const useUserPrefsStore = defineStore('user-prefs', () => {

  const theme = useTheme();

  const defaultTheme = useLocalStorage(KEY_USERPREF_THEME, VALUE_USERPREF_THEME_DEFAULT);


  function toggleTheme() {
    const themeChangeTo = theme.global.current.value.dark ? 'light' : 'dark';
    // Define Current Theme
    theme.global.name.value = themeChangeTo;
    // Save Theme
    defaultTheme.value = themeChangeTo;
    return themeChangeTo;
  }

  function isThemeDark() {
    return theme.global.current.value.dark;
  }


  return {
    defaultTheme, toggleTheme, isThemeDark,
  };
});
