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
const {copy:copyLogin, copied:copiedLogin} = useClipboard();


// Display
const iconClipboard = computed(() => (copied.value ? 'mdi-clipboard-check-outline' : 'mdi-clipboard-outline'));
const iconClipboardHost = computed(() => (copiedHost.value ? 'mdi-clipboard-check-outline' : 'mdi-clipboard-outline'));
const iconClipboardLogin = computed(() => (copiedLogin.value ? 'mdi-clipboard-check-outline' : 'mdi-clipboard-outline'));

 
const props = defineProps({
  host: {
    type: String,
    required: false,
    default: undefined
  },
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

function copyClipboardLogin() {
  logger.debug('[Click] copyClipboard Login');
  const dataStr = pass.value ? pass.value.user : '';
  return copyLogin(dataStr);
}
function copyClipboardPassword() {
  logger.debug('[Click] copyClipboard Password');
  const dataStr = pass.value ? pass.value.password : '';
  return copy(dataStr);
}


</script>

<template>
  <v-container>
    <v-alert
      v-if="error"
      type="error"
      title="Query error"
    >
      {{ error }}
    </v-alert>
    <v-card
      v-else
      :id="pass?.host"
      variant="tonal"
    >
      <template #loader>
        <v-progress-linear
          color="green-lighten-3"
          height="20"
          indeterminate
          :active="loading"
        />
      </template>
      <v-card-title color="on-primary">
        <span v-if="pass">
          <span style="padding: 5px">
            <v-icon
              v-if="pass?.server?.icon"
              :icon="pass?.server?.icon"
            />
            <v-icon
              v-else
              icon="mdi-server"
            />
          </span>
          <span>{{ pass?.server?.name }}</span>
          <span>
            (<span> {{ pass?.host }}</span>
            <span style="padding: 5px">
              <v-icon
                v-if="isClipboardSupport"
                role="button"
                aria-label="Copy Clipboard Host"
                color="primary"
                :icon="iconClipboardHost"
                @click="copyClipboardHost"
              />
            </span>)
          </span>
        </span>
      </v-card-title>
      <v-card-subtitle
        v-if="pass"
        color="on-primary"
      >
        {{ pass?.server?.description }}
      </v-card-subtitle>
      <v-card-text v-if="pass">
        <v-container>
          <v-row dense>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pass.user"
                label="Login"
                prepend-inner-icon="mdi-account"
                readonly
                variant="outlined"
                @click="copyClipboardLogin"
              >
                <template #append-inner>
                  <v-icon
                    v-if="isClipboardSupport"
                    :icon="iconClipboardLogin"
                  />
                </template>
              </v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pass.password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                readonly
                variant="outlined"
                @click="copyClipboardPassword"
              >
                <template #append-inner>
                  <v-icon
                    v-if="isClipboardSupport"
                    :icon="iconClipboard"
                  />
                </template>
              </v-text-field>
            </v-col>
          </v-row>



          <v-chip
            variant="elevated"
            rounded="pill"
          >
            Fin: {{ validityHuman }}
          </v-chip>
          <v-chip
            variant="elevated"
            rounded="pill"
          >
            Fin: {{ validityAgo }}
          </v-chip>
        </v-container>
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
          @click="refreshPassword"
        >
          {{ $t('buttons.updateNow') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>