<script setup lang="ts">
// Init Stores

import {usePasswordStore} from '@/store/PasswordStore';

//  Feature
import {  inject, onMounted, type Ref, ref, watch} from 'vue';
import type {PasswordVO} from "@/model/api/PasswordVO";
import type {Logger, RootLogger} from "loglevel";

// Date
import PasswordCard from '@/components/servers/PasswordCard.vue';


// Store
const logger: Logger = (inject('logger') as RootLogger).getLogger('PasswordElement');
const store = usePasswordStore();

// Feature
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  host: String,
});

const pass: Ref<PasswordVO | undefined> = ref();
const loading = ref(false);
const error = ref();


onMounted(() => {
  updatePassword(props.host);
});



watch(() => props.host, async (newHost) => {
  updatePassword(newHost);
});

function updatePassword(host: string | undefined) {
  if (host) {
    loading.value=true;
    store.getPassword(props.host).then(res => {
      pass.value = res;
      error.value = undefined;
      loading.value=false;
    }).catch(err => {
      pass.value = undefined;
      error.value = err;
      loading.value=false;
    });
  } else {
    pass.value = undefined;
  }
}




</script>

<template>
  <v-container>
    <v-progress-linear  indeterminate  v-if="loading"></v-progress-linear >
    <v-alert type="error" title="Query error" v-if="error">{{ error }}</v-alert>
    <password-card :password="pass" v-if="pass"></password-card>
  </v-container>
</template>