<template>
  <div>
    <h2 class="text-2xl font-bold">Welcome, {{ user?.user?.username }}!</h2>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchCurrentUser } from '@/composables/useRavelryApi'
import { useAuthStore } from '@/stores/auth'
import type { RavelryUser } from '@/types/ravelry'
import router from '@/router'

const authStore = useAuthStore()
const user = ref<RavelryUser | null>(null)

onMounted(async () => {
  if (authStore.isAuthenticated) {
    user.value = await fetchCurrentUser()
  }
})

const logout = () => {
  authStore.logout
  router.push('/')
}
</script>
