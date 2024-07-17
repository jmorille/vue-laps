<script lang="ts" setup>
  import { useAuthStore } from '@/store/AuthStore';
  import type { Ref } from 'vue';
  import { computed, onMounted } from 'vue';
  import { sanitizeUrl } from '@braintree/sanitize-url';

  const auth = useAuthStore();

  const fullName = computed(() => `${auth.firstName} ${auth.lastName}`);
  const avatarText = computed(() => `${auth.firstName?.slice(0, 1)}${auth.lastName?.slice(0, 1)}`);

  const authAccountUrl = computed(() => sanitizeUrl(auth.authAccountUrl));

  // TODO Compute Color
  const avatarTextColorList = [
    'red',
    'pink',
    'purple',
    'deep-purple',
    'indigo',
    'blue',
    'light-blue',
    'cyan',
    'teal',
    'green',
    'light-green',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deep-orange',
    'blue-grey',
  ];

  const avatarTextId: Ref<number> = computed(() => avatarText.value.charCodeAt(0) + avatarText.value.charCodeAt(1));
  const avatarTextColorIdx = computed(() => avatarTextId.value % avatarTextColorList.length);
  const avatarTextColor = computed(() => avatarTextColorList[avatarTextColorIdx.value]);

  onMounted(() => {
    if (auth.isAuthenticated) {
      auth.getUserProfile();
    }
  });
</script>

<template>
  <template v-if="auth.isAuthenticated">
    <v-list>
      <v-list-item
        role="navigation"
        aria-label="Auth Profile"
        :title="fullName"
        :subtitle="auth.email"
        :href="authAccountUrl"
      >
        <template #prepend>
          <v-avatar
            v-if="auth.avatar"
            :image="auth.avatar"
            aria-label="Auth Initial"
          />
          <v-avatar
            v-else
            :color="avatarTextColor"
          >
            <span
              class="text-h5"
              aria-label="Auth Name"
            >{{ avatarText }}</span>
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>

    <v-divider />
  </template>
</template>
