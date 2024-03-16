<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import { useTheme } from 'vuetify';

  const theme = useTheme();

  // All Theme Confgis
  function extractThemeName(dark: boolean) {
    return Object.entries(theme.themes.value)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([key, val]) => val.dark == dark)
      .map(([key]) => key);
  }

  const darkThemes = computed(() => extractThemeName(true));
  const lightThemes = computed(() => extractThemeName(false));

  // Theme Config
  const myThemes = computed(() => (isDarkTheme.value ? darkThemes.value : lightThemes.value));
  const isDarkTheme = computed(() => theme.global.current.value.dark);
  const selectedTheme = ref();

  onMounted(() => {
    selectedTheme.value = theme.global.name.value;
  });

  watch(theme.global.name, async () => {
    selectedTheme.value = theme.global.name.value;
  });

  const setTheme = () => {
    theme.global.name.value = selectedTheme.value;
    console.log(selectedTheme.value);
  };
</script>
<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img contain height="300" src="/logo.svg" alt="logo" />
      <div class="text-body-2 font-weight-light mb-n1" v-t="'home.welcome_to'"></div>

      <h1 class="text-h2 font-weight-bold" v-t="'app.title'"></h1>

      <div class="py-5" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto"> <v-btn color="primary"> Primary </v-btn> </v-col>
        <v-col cols="auto">
          <v-btn color="secondary"> Secondary </v-btn>
        </v-col>
        <v-col cols="auto"> <v-btn color="error"> Error </v-btn> </v-col>
      </v-row>

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn color="info"> Info </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="success"> Success </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="warning"> Warning </v-btn>
        </v-col>
      </v-row>

      <div class="py-5" />

      <div class="py-5" />
      <v-row class="d-flex align-center justify-center">
        <v-col cols="4">
          {{ selectedTheme }}
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="4">
          <v-select
            label="Select Theme"
            v-model="selectedTheme"
            :items="myThemes"
            @update:modelValue="setTheme()"></v-select>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
