import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const oauthState = ref<string | null>(sessionStorage.getItem('oauth_state'))

  const isAuthenticated = computed(() => !!accessToken.value)

  function setTokens(newAccessToken: string, newRefreshToken: string) {
    accessToken.value = newAccessToken
    refreshToken.value = newRefreshToken
  }

  function setState(newState: string) {
    oauthState.value = newState
    sessionStorage.setItem('oauth_state', newState)
  }

  function logout() {
    accessToken.value = null
    refreshToken.value = null
    oauthState.value = null
    sessionStorage.removeItem('oauth_state')
  }

  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    setTokens,
    logout,
    oauthState,
    setState,
  }
})
