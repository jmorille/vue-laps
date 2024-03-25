<script setup lang="ts">
  import { inject, onMounted, type Ref, ref } from 'vue';
import type {Logger, RootLogger} from "loglevel";


// Component
import PasswordElement from "@/components/servers/PasswordElement.vue";

import dayjs from 'dayjs';
import { usePasswordStore } from '@/store/PasswordStore';
import type { PasswordVO } from '@/model/api/PasswordVO';


//  Logger
const logger: Logger = (inject('logger') as RootLogger).getLogger('PasswordView');


const props = defineProps({
  hostname: {type: String, required: true},
});


// Config
const hostnameLocal = ref();

onMounted(() => {
  if (props.hostname) {
    hostnameLocal.value = props.hostname;
    logger.debug(`Define search for ${hostnameLocal.value}`);
  } else {
    hostnameLocal.value = undefined;
  }
});


</script>
<template>


  <v-container fluid>
    <password-element :host="hostnameLocal"></password-element>
  </v-container>
</template>