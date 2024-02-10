import { defineStore } from 'pinia'
import { SimStatetInterface } from '../Interfaces'

export const useSimStateStore = defineStore({
  id: 'simState',
  state: (): SimStatetInterface => ({
    connected: false,
    exception: null,
  }),
})
