import { defineStore } from 'pinia'
import { AppStateInterface } from '../Interfaces'

export const useAppStateStore = defineStore({
  id: 'appState',
  state: (): AppStateInterface => ({
    sidePanelOpen: false,
    loading: true,
    airplaneCentered: true,
    geonamesPanelVisible: true,
    geonamesUsername: ''
  }),
  actions: {
    sidePanelToggle() {
      this.sidePanelOpen = !this.sidePanelOpen
    }
  }
})
