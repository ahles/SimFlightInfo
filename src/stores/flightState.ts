import { defineStore } from 'pinia'
import { FlightStateInterface } from '../Interfaces'

export const useFlightStateStore = defineStore({
  id: 'flightState',
  state: (): FlightStateInterface => ({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    altitudeAboveGround: 0,
    heading: 0, // degrees
    degreesBank: 0, // rad
    degreesPitch: 0, // rad
    airSpeedTrue: 0,
    airSpeedIndicated: 0,
    verticalSpeed: 0
  })
})
