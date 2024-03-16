<script setup lang="ts">
import {inject, ref} from 'vue';
import {watchDebounced} from '@vueuse/core';
import {useI18n} from 'vue-i18n';
import type {Logger, RootLogger} from "loglevel";


// Component
import PasswordElement from "@/components/servers/PasswordElement.vue";


//  Logger
const logger: Logger = (inject('logger') as RootLogger).getLogger('PasswordSearch');

// I18n
const {t} = useI18n();


const props = defineProps({
  hostname: {type: String, required: true},
});

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
    <v-text-field v-if="!props.hostname"
                  role="search"
                  prepend-inner-icon="mdi-magnify"
                  :label="t('input.hostName')"
                  variant="underlined"
                  v-model="hostNameSearch"
                  clearable>
    </v-text-field>


    <password-element :host="hostnameLocal" v-if="hostname"></password-element>
  </v-container>
</template>