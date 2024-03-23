<script setup lang="ts">
  import { computed, inject, onMounted, ref } from 'vue';
import {useI18n} from 'vue-i18n';
import type {Logger, RootLogger} from "loglevel";


// Component
import PasswordElement from "@/components/servers/PasswordElement.vue";
  import { usePasswordStore } from '@/store/PasswordStore';


//  Logger
const logger: Logger = (inject('logger') as RootLogger).getLogger('PasswordSearch');

// I18n
const {t} = useI18n();

// Notify
const loading = ref(false);
const snackbar = ref(false);
const timeout = ref(1000);
const refreshDuration = ref(0);

// Store
const store = usePasswordStore();
const serverList = computed(( ()=> store.serverList ));

onMounted(() => {
  store.fetchServerList().then(() => {
    logger.debug( `Server List fetched`);
  });
});

// Autocomplete
const serverHost = computed( () => serverList.value.map( server => server.host));

// Config
const hostnameList = ref([]);



</script>
<template>
  <v-container fluid>
    <v-progress-linear  indeterminate  v-if="loading"></v-progress-linear >
    <v-autocomplete
                  role="search"
                  prepend-inner-icon="mdi-magnify"
                  :label="t('input.hostName')"
                  variant="underlined"
                  v-model="hostnameList"
                  :items="serverHost"
                  density="comfortable"
                  chips
                  closable-chips
                  multiple
                  >
    </v-autocomplete>

    <v-alert type="error" title="Query error" v-if="store.error">{{ store.error }}</v-alert>
    <div v-for="host in hostnameList" :key="host">
      <password-element :host="host" ></password-element>
    </div>

    <v-snackbar v-model="snackbar" :timeout="timeout"  color="success" location="right bottom"
                variant="tonal" elevation="24" rounded="pill" class="ma-2">
      {{ $t('notify.refreshMs', { durationMs: refreshDuration }) }}
    </v-snackbar>
  </v-container>
</template>