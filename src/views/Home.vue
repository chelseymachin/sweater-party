<template>
  <div class="container flex flex-col items-center">
    <h1 class="text-7xl font-extrabold text-pink-500">Sweater Party</h1>
    <button @click="loginWithRavelry" class="btn btn-primary mt-6">Login with Ravelry</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const generateRandomState = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const loginWithRavelry = () => {
  const state = generateRandomState()
  authStore.setState(state)
  const oauthUrl = `https://www.ravelry.com/oauth2/auth?client_id=${import.meta.env.VITE_RAVELRY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(import.meta.env.VITE_REDIRECT_URI)}&scope=offline&state=${state}`
  window.location.href = oauthUrl
}
</script>
<style scoped>
.container {
  margin-top: 14rem;
  text-align: center;
  width: 100%;
}

button {
  width: 300px;
}
</style>
