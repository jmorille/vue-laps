<script setup lang="ts">
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img
        cover
        height="300"
        src="/logo.svg"
        alt="logo"
      />

      <div
        v-t="'app.title'"
        class="text-body-2 font-weight-light mb-n1"
      />

      <h1
        v-t="'error.notfound.title'"
        class="text-h2 font-weight-bold"
      />

      <div class="py-5" />
    </v-responsive>
  </v-container>
</template>
