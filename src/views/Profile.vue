<template>
  <div>
    <h2 class="text-2xl font-bold">Welcome, {{ user?.user?.username }}!</h2>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchCurrentUser, getCurrentUserProjectsList } from '@/composables/useRavelryApi'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import type { RavelryUser } from '@/types/ravelry'
import router from '@/router'

const authStore = useAuthStore()
const userStore = useUserStore()
const user = ref<RavelryUser | null>(null)

onMounted(async () => {
  if (authStore.isAuthenticated) {
    await fetchCurrentUser()
    user.value = userStore.user
    await getCurrentUserProjectsList()
  }
})

const logout = () => {
  authStore.logout
  router.push('/')
}
</script>
