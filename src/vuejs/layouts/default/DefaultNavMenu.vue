<script lang="ts" setup>
  import AuthListItem from '@/components/auth/AuthListItem.vue';
  import {useAuthStore} from "@/store/AuthStore";
  import {computed} from 'vue';

  // Store
  const auth = useAuthStore();

  // Constant
  const isAuthenticatedUser = computed(() =>  auth.isAuthenticatedUser );

</script>

<template>
  <auth-list-item></auth-list-item>

  <v-list density="compact" nav>
    <v-list-item role="navigation" aria-label="Got to Home" prepend-icon="mdi-home" to="/">
      <template v-slot:title>
        <div v-t="'menu.home'"></div>
      </template>
    </v-list-item>

    <v-list-item role="navigation" aria-label="Got to List Queue" prepend-icon="mdi-view-dashboard" to="/servers" v-if="isAuthenticatedUser" >
      <template v-slot:title>
        <div v-t="'menu.servers'"></div>
      </template>
    </v-list-item>




    <v-list-item role="navigation" aria-label="Got to Queue" prepend-icon="mdi-server" to="/password" v-if="isAuthenticatedUser">
      <template v-slot:title>
        <div v-t="'menu.password'"></div>
      </template>
    </v-list-item>

    <v-list-item role="navigation" aria-label="Go to About" prepend-icon="mdi-gift-open-outline" to="/about" v-if="isAuthenticatedUser">
      <template v-slot:title>
        <div v-t="'menu.about'"></div>
      </template>
    </v-list-item>
  </v-list>

  <router-view name="NavMenu"></router-view>
</template>
