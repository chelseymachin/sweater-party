import { useAuthStore } from '@/stores/auth'
import type { RavelryUser } from '@/types/ravelry'

export const fetchCurrentUser = async () => {
  const authStore = useAuthStore()
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
    console.log(data)
    return data
  } catch (error) {
    console.error('🚨 Error fetching Ravelry user data:', error)
    return null
  }
}
