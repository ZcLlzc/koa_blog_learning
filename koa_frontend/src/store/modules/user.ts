import { defineStore } from 'pinia'
import { store } from '@/store'
import { userType } from '@/types'
import { getUser } from '@/utils/auth'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getUser('token'),
      hasPermission: !!getUser('token'),
      userId: getUser('userId')
    }
  },
  actions: {
    SET_USER_INFO(data: userType) {
      const { token, userId } = data
      this.token = token
      this.hasPermission = !!token
      this.userId = userId
    },
    REMOVE_USER_INFO() {
      this.token = null
      this.hasPermission = false
      this.userId = null
    }
  }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
