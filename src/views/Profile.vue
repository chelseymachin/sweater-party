<template>
  <div v-if="authStore.isAuthenticated">
    <h2 class="text-2xl font-bold">Welcome, {{ user?.user?.username }}!</h2>
    <button @click="authStore.clearTokens">Logout</button>
  </div>
  <div v-else>
    <p>Not logged in. <router-link to="/">Login</router-link></p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchCurrentUser } from '@/composables/useRavelryAPI'
import { useAuthStore } from '@/stores/auth'
import type { RavelryUser } from '@/types/ravelry'

const authStore = useAuthStore()
const user = ref<RavelryUser | null>(null)

onMounted(async () => {
  if (authStore.isAuthenticated) {
    user.value = await fetchCurrentUser()
  }
})
</script>
