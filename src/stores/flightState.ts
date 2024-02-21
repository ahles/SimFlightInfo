import { defineStore } from 'pinia'
import { FlightStateInterface } from '../Interfaces'

/**
 * Test corrdinates
 * logitude: 8.46
 * latitude: 47.43
 */
export const useFlightStateStore = defineStore({
  id: 'flightState',
  state: (): FlightStateInterface => ({
    latitude: 0, // ° 47.43
    longitude: 0, // ° 8.46
    altitude: 0, // ft
    altitudeAboveGround: 0, // ft
    heading: 0, // degrees
    headingTrue: 0, // degrees
    degreesBank: 0, // rad
    degreesPitch: 0, // rad
    airSpeedTrue: 0, // kts
    airSpeedIndicated: 0, // kts
    verticalSpeed: 0 // ft / min
  })
})
