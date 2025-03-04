import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import type { RavelryUser } from '@/types/ravelry'

export const fetchCurrentUser = async () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  let accessToken = authStore.accessToken

  if (!accessToken) {
    console.error('❌ No access token found. User may need to log in again.')
    return null
  }

  try {
    const response = await fetch('https://api.ravelry.com/current_user.json', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${await response.text()}`)
    }

    const data: RavelryUser = await response.json()
    userStore.setUser(data)
  } catch (error) {
    console.error('🚨 Error fetching Ravelry user data:', error)
    return null
  }
}

export const getCurrentUserProjectsList = async () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  let currentUser = userStore.user
  let accessToken = authStore.accessToken

  if (!authStore.isAuthenticated || !currentUser) {
    console.error('❌ Not authenticated. User may need to log in again.')
    return null
  }

  try {
    const response = await fetch(
      `https://api.ravelry.com/projects/${currentUser.user.username}/list.json`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${await response.text()}`)
    }

    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('🚨 Error fetching Ravelry user projects:', error)
    return null
  }
}
