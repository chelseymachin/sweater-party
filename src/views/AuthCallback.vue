<template>
  <div class="flex flex-col items-center">
    <h2 class="text-2xl font-bold">Authenticating...</h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const fetchAccessToken = async (code: string) => {
  try {
    console.log('🔄 Sending code to Lambda for token exchange...')

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}?code=${code}`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`OAuth error: ${response.status} ${await response.text()}`)
    }

    const data = await response.json()
    console.log('✅ Authentication successful!')

    if (data.access_token && data.refresh_token) {
      authStore.setTokens(data.access_token, data.refresh_token)

      // Redirect user to profile page
      router.push('/profile')
    } else {
      console.error('❌ Authentication failed: No tokens received')
      router.push('/auth/error')
    }
  } catch (error) {
    console.error('🚨 Error fetching token:', error)
    router.push('/auth/error')
  }
}

onMounted(() => {
  const authCode = route.query.code as string
  const returnedState = route.query.state as string

  const storedState = authStore.oauthState

  if (!returnedState || returnedState !== storedState) {
    console.error('❌ Invalid state!', storedState, returnedState)
    router.push('/auth/error')
    return
  }

  if (authCode) {
    fetchAccessToken(authCode)
  } else {
    console.error('❌ No authorization code found in URL')
    router.push('/auth/error')
  }
})
</script>
