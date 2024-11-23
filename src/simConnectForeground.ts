import { ref, onMounted, onUnmounted } from 'vue'
import { FlightData } from './Interfaces'

/**
 * Listen to the simconnect events and return reactive flight data
 * @returns flight data
 */
export function useSimConnectForeground() {
  const longitude = ref(0) // 8.455
  const latitude = ref(0) // 47.435
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
      longitude.value = data.longitude
      latitude.value = data.latitude
      altitude.value = data.altitude
      altitudeAboveGround.value = data.altitudeAboveGround
      heading.value = data.heading
      headingTrue.value = data.headingTrue
      degreesBank.value = data.degreesBank
      degreesPitch.value = data.degreesPitch
      airSpeedTrue.value = data.airSpeedTrue
      airSpeedIndicated.value = data.airSpeedIndicated
      verticalSpeed.value = data.verticalSpeed
    })
  })

  onUnmounted(() => {
    window.ipcRenderer.removeAllListeners('simconnect-flightdata')
  })

  return {
    longitude,
    latitude,
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
