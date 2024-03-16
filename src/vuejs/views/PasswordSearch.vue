<script setup lang="ts">
  import { computed, inject, onMounted, ref } from 'vue';
import {watchDebounced} from '@vueuse/core';
import {useI18n} from 'vue-i18n';
import type {Logger, RootLogger} from "loglevel";


// Component
import PasswordElement from "@/components/servers/PasswordElement.vue";
  import { usePasswordStore } from '@/store/PasswordStore';


//  Logger
const logger: Logger = (inject('logger') as RootLogger).getLogger('PasswordSearch');

// I18n
const {t} = useI18n();

// Store
const store = usePasswordStore();
const serverList = computed(( ()=> store.serverList ));

  onMounted(() => {
    store.fetchServerList();
  });

// Autocomplete
const serverHost = computed( () => serverList.value.map( server => server.host));

// Config
const hostnameLocal = ref();
const hostNameSearch = ref();


watchDebounced(
    hostNameSearch,
    () => {
      hostnameLocal.value = hostNameSearch.value;
      logger.debug(`Define search for ${hostnameLocal.value}`);
    },
    {debounce: 300, maxWait: 5000}
);

</script>
<template>
  <v-container fluid>
    <v-autocomplete
                  role="search"
                  prepend-inner-icon="mdi-magnify"
                  :label="t('input.hostName')"
                  variant="underlined"
                  v-model="hostNameSearch"
                  :items="serverHost"
                  clearable>
    </v-autocomplete>

    <v-alert type="error" title="Query error" v-if="store.error">{{ store.error }}</v-alert>

    <password-element :host="hostnameLocal" v-if="hostnameLocal"></password-element>
  </v-container>
</template>