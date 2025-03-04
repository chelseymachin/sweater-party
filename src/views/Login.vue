<template>
  <div class="flex flex-col items-center">
    <button @click="loginWithRavelry" class="btn btn-primary">Login with Ravelry</button>
  </div>
</template>

<script setup lang="ts">
const CLIENT_ID = '79126adf3f9e513f6088d929116adc53'
const REDIRECT_URI = 'https://localhost:5174/auth/callback' // Change for production

const generateRandomState = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const loginWithRavelry = () => {
  const state = generateRandomState()
  localStorage.setItem('oauth_state', state)
  const oauthUrl = `https://www.ravelry.com/oauth2/auth?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=offline&state=${state}`

  console.log('🔗 Redirecting to Ravelry OAuth:', oauthUrl)
  window.location.href = oauthUrl // Redirects user to Ravelry login page
}
</script>
