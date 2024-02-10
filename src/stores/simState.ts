import { defineStore } from 'pinia'
import { SimInterface } from '../Interfaces'

export const useSimStateStore = defineStore({
  id: 'simState',
  state: (): SimInterface => ({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    altitudeAboveGround: 0,
    heading: 0,
    degreesBank: 0,
    degreesPitch: 0,
    airSpeedTrue: 0,
    airSpeedIndicated: 0,
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
