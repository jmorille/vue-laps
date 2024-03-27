<script setup lang="ts">
  // Init Stores

  import { usePasswordStore } from '@/store/PasswordStore';
  import dayjs from 'dayjs';

  //  Feature
  import duration  from 'dayjs/plugin/duration';
  import { ref } from 'vue';
  dayjs.extend(duration);

  // Store
  const store = usePasswordStore();

  // Notify
  const snackbar = ref(false);
  const timeout = ref(1000);
  const refreshDuration = ref();


  function clickRefresh() {
    const begin = dayjs();
    store.fetchServerList().then( ()=> {
      const end = dayjs();
      refreshDuration.value = dayjs.duration(end.diff(begin)).asMilliseconds();
      snackbar.value=true;
    });
  }
</script>
<template>
  <v-btn role="button" aria-label="Refresh List" variant="text" icon="mdi-refresh" @click="clickRefresh"></v-btn>

  <v-snackbar v-model="snackbar" :timeout="timeout"  color="success" location="right bottom"
              variant="tonal" class="elevation-24 ma-2" rounded="pill" >
    {{ $t('notify.refreshMs', { durationMs: refreshDuration }) }}
  </v-snackbar>

</template>
