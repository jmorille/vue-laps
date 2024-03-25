<script setup lang="ts">
// Init Stores

import {usePasswordStore} from '@/store/PasswordStore';

//  Feature
import { computed, inject, onMounted, onUnmounted, type Ref, ref, watch } from 'vue';
import type {PasswordVO} from "@/model/api/PasswordVO";
import type {Logger, RootLogger} from "loglevel";

// Date
import dayjs, { type Dayjs } from 'dayjs';
import { useClipboard } from '@vueuse/core';
// Feature
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

// Dayjs config
dayjs.extend(relativeTime);
dayjs.extend(duration);
// Store
const logger: Logger = (inject('logger') as RootLogger).getLogger('PasswordElement');
const store = usePasswordStore();

// Feature
const {copy, copied, isSupported: isClipboardSupport} = useClipboard();
const {copy:copyHost, copied:copiedHost} = useClipboard();


// Display
const iconClipboard = computed(() => (copied.value ? 'mdi-clipboard-check-outline' : 'mdi-clipboard-outline'));
const iconClipboardHost = computed(() => (copiedHost.value ? 'mdi-clipboard-check-outline' : 'mdi-clipboard-outline'));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  host: String,
});


// Timer
const now: Ref<Dayjs> = ref(dayjs())
let interval:number |undefined = undefined;

// Validity Date Display
const validityDate = computed(() => pass.value?.validity ? dayjs(pass.value?.validity, undefined, 'fr')  : undefined);
const validityAgo = computed(() => validityDate.value ? now.value.to(validityDate.value) : '?');
const validityHuman = computed(() => validityDate.value ? validityDate.value.format('dddd D MMMM YYYY à HH:mm:ss') : '?');


const pass: Ref<PasswordVO | undefined> = ref();
const loading = ref(false);
const error = ref();


onMounted(() => {
  updatePassword(props.host);
  interval = window.setInterval( () => {
    now.value = dayjs();
  }, 30000);
});


onUnmounted( () => {
  window.clearInterval(interval);
});

function copyClipboard() {
  logger.debug('[Click] copyClipboard');
  const dataStr = pass.value ? pass.value.password : '';
  return copy(dataStr);
}

watch(() => props.host, async (newHost) => {
  updatePassword(newHost);
});

function refreshPassword() {
  updatePassword(props.host);
}

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
    loading.value = false;
  }
}

function copyClipboardHost() {
  logger.debug('[Click] copyClipboardHost');
  const dataStr = pass.value ? pass.value.host : '';
  return copyHost(dataStr);
}



</script>

<template>
  <v-container>

    <v-alert type="error" title="Query error" v-if="error">{{ error }}</v-alert>
    <v-card :id="pass?.host" variant="tonal" v-else>
      <template v-slot:loader>
        <v-progress-linear  color="green-lighten-3"  height="20" indeterminate :active="loading"></v-progress-linear >
      </template>
      <v-card-title color="on-primary">{{ pass?.host }}
        <span v-if="pass">
          <v-icon
            role="button"
            aria-label="Copy Clipboard Host"
            @click="copyClipboardHost"
            v-if="isClipboardSupport"
            color="primary"
            :icon="iconClipboardHost"></v-icon>
        </span>
      </v-card-title>
      <v-card-subtitle  color="on-primary"  v-if="pass">  {{ pass?.server?.description }}</v-card-subtitle>
      <v-card-text v-if="pass">
        <v-chip variant="elevated" rounded="pill">{{ pass?.password }}
          <span><v-icon
            role="button"
            aria-label="Copy Clipboard Password"
            @click="copyClipboard"
            v-if="isClipboardSupport"
            color="primary"
            :icon="iconClipboard"></v-icon>
          </span>
        </v-chip>
        <v-chip variant="elevated" rounded="pill">
          Fin: {{ validityHuman }}
        </v-chip>
        <v-chip variant="elevated" rounded="pill">
          Fin: {{ validityAgo }}
        </v-chip>
      </v-card-text>
      <v-card-actions v-if="pass">
<!--        <v-switch-->
<!--          v-model="autoUpdate"-->
<!--          :disabled="isUpdating"-->
<!--          class="mt-0 ms-2"-->
<!--          color="green-lighten-2"-->
<!--          density="compact"-->
<!--          label="Auto Update"-->
<!--          hide-details-->
<!--        ></v-switch>-->

<!--        <v-spacer></v-spacer>-->

        <v-btn
          :loading="loading"
          :variant="loading ? 'tonal' : undefined"
          color="blue-grey-lighten-3"
          prepend-icon="mdi-update"
          v-on:click="refreshPassword"
        >{{ $t('buttons.updateNow')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>