<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  const route = useRoute();
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition
      name="fade"
      mode="out-in"
    >
      <component
        :is="Component"
        :key="route.path"
      />
    </transition>
  </router-view>
</template>
