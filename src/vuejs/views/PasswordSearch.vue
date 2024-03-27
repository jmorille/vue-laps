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
                  :items="serverList"
                  item-title="host"
                  item-value="host"
                  density="comfortable"
                  chips
                  closable-chips
                  multiple
                  >
      <template v-slot:chip="{ props, item }">
        <v-chip
          v-bind="props"
          :text="item.raw.name"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.raw.icon" v-if="item.raw.icon"></v-icon>
            <v-icon icon="mdi-server" v-else></v-icon>
          </template>
        </v-chip>
      </template>

      <template v-slot:item="{ props, item }">
        <v-list-item
          v-bind="props"
          :subtitle="item.raw.description"
        >

          <template v-slot:title>
            {{item.raw.name}} ( {{item.raw.host}} )
          </template>

          <template v-slot:prepend>
            <v-icon :icon="item.raw.icon" v-if="item.raw.icon"></v-icon>
            <v-icon icon="mdi-server" v-else></v-icon>
          </template>
        </v-list-item>
      </template>
    </v-autocomplete>

    <v-alert type="error" title="Query error" v-if="store.error">{{ store.error }}</v-alert>
    <div v-for="host in hostnameList" :key="host">
      <password-element :host="host" ></password-element>
    </div>

    <v-snackbar v-model="snackbar" :timeout="timeout"  color="success" location="right bottom"
                variant="tonal" class="elevation-24 ma-2" rounded="pill" >
      {{ $t('notify.refreshMs', { durationMs: refreshDuration }) }}
    </v-snackbar>
  </v-container>
</template>