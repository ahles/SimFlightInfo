import { defineStore } from 'pinia'
import { FlightStateInterface } from '../Interfaces'

export const useFlightStateStore = defineStore({
  id: 'flightState',
  state: (): FlightStateInterface => ({
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
})
