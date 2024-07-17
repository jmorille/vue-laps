<script setup lang="ts">
  import type { Logger, RootLogger } from 'loglevel';
  import { usePasswordStore } from '@/store/PasswordStore';
  import {computed, inject, onMounted, ref} from 'vue';
  import router from '@/router';
  // Feature
  import dayjs from 'dayjs';
  import duration from 'dayjs/plugin/duration';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import PasswordElement from "@/components/servers/PasswordElement.vue";
  import type { VDataTable } from 'vuetify/components'
  type ReadonlyHeaders = VDataTable['$props']['headers']

  // Dayjs config
  dayjs.extend(relativeTime);
  dayjs.extend(duration);
//  Logger
  const logger: Logger = (inject('logger') as RootLogger).getLogger('PasswordServerView');
// Store
  const store = usePasswordStore();
  const serverList = computed(( ()=> store.serverList ));

  // Notify
  const snackbar = ref(false);
  const timeout = ref(1000);
  const refreshDuration = ref();
  const expanded = ref([]);


  onMounted(() => {
    logger.info("onMounted ==> fetchServerList");
    const begin = dayjs();
    store.fetchServerList().then(() => {
      const end = dayjs();
      refreshDuration.value = dayjs.duration(end.diff(begin)).asMilliseconds();
      snackbar.value=true;
    });
  });


  // data
  const search =  ref();
  const sortBy = ref([]);


//
  const headers: ReadonlyHeaders = [
    { key: 'icon', title: 'Type', align: "center", sortable: false },
    { key: 'name', title: 'Nom du serveur', sortable: true },
    { key: 'host', title: 'Hostname', sortable: true },
    { title: '', key: 'data-table-expand' },
  ];

  /**
   *
   * @param event PointerEvent
   * @param row of not exported type : DataTableItem
   */
  // eslint-disable-next-line   @typescript-eslint/no-explicit-any
  function serverRowlicked(event: Event, row: any) {
    const hostname = row.item.host;
    logger.info(`Router Push ${hostname}`);
    router.push({ name: 'PasswordView', params: { hostname } });
  }



</script>

<template>
  <v-container fluid>
    <v-alert
      v-if="store.error"
      type="error"
      title="Query error"
    >
      {{ store.error }}
    </v-alert>
    <div v-else>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        clearable
        variant="outlined"
        hide-details
      />
      <v-data-table-virtual
        v-model:expanded="expanded"
        v-model:sort-by="sortBy"
        hide-no-data
        :headers="headers"
        :items="serverList"
        :search="search"
        item-key="host"
        item-value="host"
        multi-sort
        show-expand
        class="elevation-1"
        @click:row="(event:Event, item:any ) => serverRowlicked(event, item)"
      >
        <template #item.icon="{ item }">
          <v-icon
            v-if="item.icon"
            :icon="item.icon"
          />
          <v-icon
            v-else
            icon="mdi-server"
          />
        </template>

        <!-- Expendable -->
        <template #expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length">
              <password-element :host="item.host" />
            </td>
          </tr>
        </template>
      </v-data-table-virtual>
    </div>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="success"
      location="right bottom"
      variant="tonal"
      class="elevation-24 ma-2"
      rounded="pill"
    >
      {{ $t('notify.refreshMs', { durationMs: refreshDuration }) }}
    </v-snackbar>
  </v-container>
</template>
