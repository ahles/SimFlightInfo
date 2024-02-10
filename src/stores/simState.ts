import { defineStore } from 'pinia'

interface SimInterface {
  latitude: number,
  longitude: number,
  altitude: number,
  kohlsmann: number,
  verticalSpeed: number,
}

export const useSimStateStore = defineStore({
  id: 'simState',
  state: (): SimInterface => ({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    kohlsmann: 0,
    verticalSpeed: 0,
  }),
  // actions: {
  //   addMarker(marker: MarkerInterface) {
  //     this.markers.push(marker)
  //   },
  //   getMarkers() {
  //     const result: Array<MarkerInterface> = []
  //     this.markers.forEach((element: MarkerInterface) => {
  //       result.push(element)
  //     })
  //     return result
  //   },
  //   clearMarkers() {
  //     this.markers = []
  //   }
  // }
})
