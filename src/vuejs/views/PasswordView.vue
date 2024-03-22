<script setup lang="ts">
  import { inject, onMounted, type Ref, ref } from 'vue';
import type {Logger, RootLogger} from "loglevel";


// Component
import PasswordElement from "@/components/servers/PasswordElement.vue";
import PasswordCard from "@/components/servers/PasswordCard.vue";

import dayjs from 'dayjs';
import { usePasswordStore } from '@/store/PasswordStore';
import type { PasswordVO } from '@/model/api/PasswordVO';


//  Logger
const logger: Logger = (inject('logger') as RootLogger).getLogger('PasswordView');


const props = defineProps({
  hostname: {type: String, required: true},
});

// Store
const store = usePasswordStore();

// Config
const hostnameLocal = ref();
const password:Ref<PasswordVO|undefined> = ref();

// Notify
const loading = ref(false);
const snackbar = ref(false);
const refreshDuration = ref(0);


  onMounted(() => {
  if (props.hostname) {
    hostnameLocal.value = props.hostname;
    logger.debug(`Define search for ${hostnameLocal.value}`);
    const begin = dayjs();
      loading.value = true;
      store.getPassword(props.hostname).then((data) => {
        const end = dayjs();
        password.value=data;
        loading.value = false;
        refreshDuration.value = dayjs.duration(end.diff(begin)).asMilliseconds();
        snackbar.value=true;
      }).catch(err => {
        loading.value = false;
      });
  }
});




</script>
<template>
  <v-container fluid>
    <v-progress-linear  indeterminate  v-if="loading"></v-progress-linear >
    <password-card :password="password" v-if="password"></password-card>

    <v-snackbar v-model="snackbar" :timeout="2000" color="success" rounded="true" variant="outlined" location="right bottom" >
      Loading in <strong>{{refreshDuration}}</strong> ms.
    </v-snackbar>
  </v-container>
</template>