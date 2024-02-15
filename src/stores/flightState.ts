import { defineStore } from 'pinia'
import { FlightStateInterface } from '../Interfaces'

export const useFlightStateStore = defineStore({
  id: 'flightState',
  state: (): FlightStateInterface => ({
    latitude: 0, // °
    longitude: 0, // °
    altitude: 0, // ft
    altitudeAboveGround: 0, // ft
    heading: 0, // degrees
    degreesBank: 0, // rad
    degreesPitch: 0, // rad
    airSpeedTrue: 0, // kts
    airSpeedIndicated: 0, // kts
    verticalSpeed: 0 // ft / min
  })
})
