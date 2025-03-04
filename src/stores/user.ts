import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RavelryUser, RavelryProjectList } from '@/types/ravelry'

export const useUserStore = defineStore('user', () => {
  const user = ref<RavelryUser | null>(null)
  const userProjectList = ref<RavelryProjectList | null>(null)

  function setUser(newUser: RavelryUser) {
    user.value = newUser
  }

  function setUserProjectList(newList: RavelryProjectList) {
    userProjectList.value = newList
  }

  return {
    user,
    setUser,
    userProjectList,
    setUserProjectList,
  }
})
