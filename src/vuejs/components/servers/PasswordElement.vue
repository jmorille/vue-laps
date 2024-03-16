<script setup lang="ts">
// Init Stores

import {usePasswordStore} from '@/store/PasswordStore';

//  Feature
import {computed, inject, onMounted, onUnmounted, type Ref, ref, watch} from 'vue';
import type {PasswordVO} from "@/model/api/PasswordVO";
import type {Logger, RootLogger} from "loglevel";

// Clipboard
import {useClipboard} from "@vueuse/core";

// Date
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(duration);

// Store
const logger: Logger = (inject('logger') as RootLogger).getLogger('PasswordElement');
const store = usePasswordStore();

// Feature
const {copy, copied, isSupported: isClipboardSupport} = useClipboard();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  host: String,
});

const pass: Ref<PasswordVO | undefined> = ref();
const error = ref();

// Display
const iconClipboard = computed(() => (copied.value ? 'mdi-clipboard-check-outline' : 'mdi-clipboard-outline'));

// Timer
const now = ref(dayjs())
let interval:number|undefined = undefined;

// Validity Date Display
const validityDate = computed(() => pass.value?.validity ? dayjs(pass.value?.validity, undefined, 'fr')  : undefined);
const validityAgo = computed(() => validityDate.value ? now.value.to(validityDate.value) : '?');
const validityHuman = computed(() => validityDate.value ? validityDate.value.format('dddd D MMMM YYYY à HH:mm:ss') : '?');


onMounted(() => {
  updatePassword(props.host);
  interval = setInterval( () => {
    now.value = dayjs();
  }, 30000);
});

onUnmounted( () => {
  clearInterval(interval);
});

watch(() => props.host, async (newHost) => {
  updatePassword(newHost);
});

function updatePassword(host: string | undefined) {
  if (host) {
    store.getPassword(props.host).then(res => {
      pass.value = res;
      error.value = undefined;
    }).catch(err => {
      pass.value = undefined;
      error.value = err;
    });
  } else {
    pass.value = undefined;
  }
}

function copyClipboard() {
  logger.debug('[Click] copyClipboard');
  const dataStr = pass.value ? pass.value.password : '';
  return copy(dataStr);
}


</script>

<template>
  <v-container>
    <v-alert type="error" title="Query error" v-if="error">{{ error }}</v-alert>
    <v-card :id="pass?.host" variant="tonal" v-else>
      <v-card-title color="on-primary">Host {{ pass?.host }}</v-card-title>
      <v-card-subtitle color="on-primary">  {{ pass?.server?.description }}

      </v-card-subtitle>
      <v-card-text>
        <v-chip variant="elevated" rounded="pill">{{ pass?.password }}
          <v-icon
              role="button"
              aria-label="Copy Clipboard Password"
              @click="copyClipboard"
              v-if="isClipboardSupport"
              color="primary"
              :icon="iconClipboard"></v-icon>
        </v-chip>
        <v-chip variant="elevated" rounded="pill">
          Fin: {{ validityHuman }}
        </v-chip>
        <v-chip variant="elevated" rounded="pill">
          Fin: {{ validityAgo }}
        </v-chip>
      </v-card-text>
    </v-card>
  </v-container>
</template>