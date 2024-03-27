<script setup lang="ts">
//import {useAuthStore} from "@/store/AuthStore";

//const auth = useAuthStore();

// const fullName = computed(() => `${auth.firstName} ${auth.lastName}`);

</script>
<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img cover height="300" src="/logo.svg" alt="logo" />

      <div class="text-body-2 font-weight-light mb-n1" v-t="'app.title'"></div>

      <h1 class="text-h2 font-weight-bold" v-t="'error.forbidden.title'"></h1>

      <div class="py-5" />

      <h1 v-t="'error.forbidden.message'"></h1>
      <h2 v-t="'error.forbidden.request'"></h2>
    </v-responsive>
  </v-container>
</template>
