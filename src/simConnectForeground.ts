import { ref, onMounted, onUnmounted } from 'vue'
import { FlightData } from './Interfaces'

/**
 * Listen to the simconnect events and return reactive flight data
 * @returns flight data
 */
export function useSimConnectForeground() {
  const latitude = ref(47.4)
  const longitude = ref(8.5)
  const altitude = ref(0)
  const altitudeAboveGround = ref(0)
  const heading = ref(0)
  const headingTrue = ref(0)
  const degreesBank = ref(0)
  const degreesPitch = ref(0)
  const airSpeedTrue = ref(0)
  const airSpeedIndicated = ref(0)
  const verticalSpeed = ref(0)

  onMounted(() => {
    window.ipcRenderer.on('simconnect-flightdata', (event, data: FlightData) => {
      // If the airplane is in the null island area, force all values to 0
      if (flightIsOnNullIsland(data)) {
        latitude.value = 0
        longitude.value = 0
        altitude.value = 0
        altitudeAboveGround.value = 0
        heading.value = 0
        headingTrue.value = 0
        degreesBank.value = 0
        degreesPitch.value = 0
        airSpeedTrue.value = 0
        airSpeedIndicated.value = 0
        verticalSpeed.value = 0
      } else {
        latitude.value = data.latitude
        longitude.value = data.longitude
        altitude.value = data.altitude
        altitudeAboveGround.value = data.altitudeAboveGround
        heading.value = data.heading
        headingTrue.value = data.headingTrue
        degreesBank.value = data.degreesBank
        degreesPitch.value = data.degreesPitch
        airSpeedTrue.value = data.airSpeedTrue
        airSpeedIndicated.value = data.airSpeedIndicated
        verticalSpeed.value = data.verticalSpeed
      }
    })
  })

  onUnmounted(() => {
    window.ipcRenderer.removeAllListeners('simconnect-flightdata')
  })

  return {
    latitude,
    longitude,
    altitude,
    altitudeAboveGround,
    heading,
    headingTrue,
    degreesBank,
    degreesPitch,
    airSpeedTrue,
    airSpeedIndicated,
    verticalSpeed
  }
}

/**
 * Checks if the flight is approximately at the geographic coordinates (0,0).
 *
 * This function determines whether the given flight's latitude and longitude
 * are within a specified threshold of zero. It's useful for identifying if the
 * flight is near the "null island" point, which is a common default for undefined
 * geographic data.
 *
 * @param {FlightData} data - An object containing the flight's current state,
 * including its latitude and longitude.
 * @returns {boolean} - Returns `true` if the flight is within the threshold of (0,0),
 * otherwise returns `false`.
 */
function flightIsOnNullIsland(data: FlightData): boolean {
  const threshold = 0.05
  return Math.abs(data.latitude) < threshold && Math.abs(data.longitude) < threshold
}