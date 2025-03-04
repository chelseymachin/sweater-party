<template>
  <div>
    <h2 class="text-2xl font-bold">Welcome, {{ user?.username }}!</h2>
    <button @click="logout">Logout</button>

    <div v-if="projects != null">
      <h3 class="text-xl font-bold">Your Projects</h3>
      <ul>
        <li v-for="project in projects.projects" :key="project.id">
          <p>{{ project.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchCurrentUser, getCurrentUserProjectList } from '@/composables/useRavelryApi'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import type { RavelryUser, RavelryProjectList } from '@/types/ravelry'
import router from '@/router'

const authStore = useAuthStore()
const userStore = useUserStore()
const user = ref<RavelryUser | null>(null)
let projects = ref<RavelryProjectList | null>(null)
const isLoading = ref(false)

onMounted(async () => {
  if (authStore.isAuthenticated) {
    isLoading.value = true
    await fetchCurrentUser()
    user.value = userStore.user
    await getCurrentUserProjectList()
    isLoading.value = false
  }
  projects.value = userStore.userProjectList
  console.log(projects.value)
})

const logout = () => {
  authStore.logout
  router.push('/')
}
</script>
