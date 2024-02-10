import { defineStore } from 'pinia'
import type { Coordinate } from 'ol/coordinate'

interface StateInterface {
  center: Coordinate
  zoom: number
  weapon: number
  markers: Array<MarkerInterface>
  asideCollapsed: boolean
}

interface MarkerInterface {
  coordinate: Coordinate
  weapon: number
}

export const useUWRStateStore = defineStore({
  id: 'UWRState',
  // persist: true,
  state: (): StateInterface => ({
    center: [31.392222, 48.999722],
    zoom: 7,
    weapon: 1,
    markers: [] as Array<MarkerInterface>,
    asideCollapsed: false
  }),
  actions: {
    addMarker(marker: MarkerInterface) {
      this.markers.push(marker)
    },
    getMarkers() {
      const result: Array<MarkerInterface> = []
      this.markers.forEach((element: MarkerInterface) => {
        result.push(element)
      })
      return result
    },
    clearMarkers() {
      this.markers = []
    }
  }
})
