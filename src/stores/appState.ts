import { defineStore } from 'pinia'

export const useAppStateStore = defineStore({
  id: 'appState',
  state: () => ({
    sidePanelOpen: false,
    loading: false,
    theme: 'dark',
    themeSelectorOpen: false,
    themes: [
      {
        label: 'dark',
        value: 'dark'
      },
      {
        label: 'light',
        value: 'light'
      }
    ]
  }),
  actions: {
    sidePanelToggle() {
      this.sidePanelOpen = !this.sidePanelOpen
    },
    themeSelectorToggle() {
      this.themeSelectorOpen = !this.themeSelectorOpen
    },
    setTheme(value: string) {
      this.theme = value
      const htmlElement = document.querySelector('html')
      if (htmlElement !== null) {
        htmlElement.dataset.theme = this.theme
      }
    }
  }
})
