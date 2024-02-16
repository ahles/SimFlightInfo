import { defineStore } from 'pinia'
import { AppStateInterface } from '../Interfaces'

export const useAppStateStore = defineStore({
  id: 'appState',
  state: (): AppStateInterface => ({
    sidePanelOpen: false,
    loading: true,
    airplaneCentered: true,
    geonamesUsername: 'FortyParsley'
  }),
  actions: {
    sidePanelToggle() {
      this.sidePanelOpen = !this.sidePanelOpen
    }
  }
})
