<script lang="ts" setup>
  import AuthListItem from '@/components/auth/AuthListItem.vue';
  import {useAuthStore} from "@/store/AuthStore";
  import {computed} from 'vue';

  // Store
  const auth = useAuthStore();

  // Constant
  const hasRoleUser = computed(() =>  auth.hasRoleUser );

</script>

<template>
  <auth-list-item />

  <v-list
    density="compact"
    nav
  >
    <v-list-item
      role="navigation"
      aria-label="Got to Home"
      prepend-icon="mdi-home"
      to="/"
    >
      <template #title>
        <div v-t="'menu.home'" />
      </template>
    </v-list-item>

    <v-list-item
      v-if="hasRoleUser"
      role="navigation"
      aria-label="Got to List Queue"
      prepend-icon="mdi-view-dashboard"
      to="/servers"
    >
      <template #title>
        <div v-t="'menu.servers'" />
      </template>
    </v-list-item>




    <v-list-item
      v-if="hasRoleUser"
      role="navigation"
      aria-label="Got to Queue"
      prepend-icon="mdi-server"
      to="/password"
    >
      <template #title>
        <div v-t="'menu.password'" />
      </template>
    </v-list-item>

    <v-list-item
      v-if="hasRoleUser"
      role="navigation"
      aria-label="Go to About"
      prepend-icon="mdi-gift-open-outline"
      to="/about"
    >
      <template #title>
        <div v-t="'menu.about'" />
      </template>
    </v-list-item>
  </v-list>

  <router-view name="NavMenu" />
</template>
