import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const hasToken = ref(false)
  return { hasToken }
},
{ persist: { storage: localStorage } }
)
