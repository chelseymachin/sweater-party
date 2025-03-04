import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RavelryUser } from '@/types/ravelry'

export const useUserStore = defineStore('user', () => {
  const user = ref<RavelryUser | null>(null)

  function setUser(newUser: RavelryUser) {
    user.value = newUser
  }

  return {
    user,
    setUser,
  }
})
