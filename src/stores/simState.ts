import { defineStore } from 'pinia'
import { SimStateInterface } from '../Interfaces'

export const useSimStateStore = defineStore({
  id: 'simState',
  state: (): SimStateInterface => ({
    connected: false,
    exception: null,
    paused: true
  })
})
