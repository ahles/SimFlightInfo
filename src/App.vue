<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { FlightStateInterface } from './Interfaces'
import { useAppStateStore } from './stores/appState'
import { useSimStateStore } from './stores/simState'
import { useFlightStateStore } from './stores/flightState'
import HeaderComponent from './components/layout/HeaderComponent.vue'
import SidePanelComponent from './components/layout/SidePanelComponent.vue'
import LoadingBarComponent from './components/gui/LoadingBarComponent.vue'
import MapComponent from './components/MapComponent.vue'
import ConnectionInformationComponent from './components/ConnectionInformationComponent.vue'
import InfoPanelComponent from './components/InfoPanelComponent.vue'
import GeonamesPanelComponent from './components/GeonamesPanelComponent.vue'

const appState = useAppStateStore()
const simState = useSimStateStore()
const flightState = useFlightStateStore()

const debug = false

/**
 * Are the app settings loaded from the filesystem?
 */
const settingsLoaded = ref(false)

onBeforeMount(() => {
  window.ipcRenderer.invoke('request-settings').then((response) => {
    settingsLoaded.value = true
    if (response !== undefined) {
      appState.geonamesUsername = response.geonamesUsername
    }
    intiSimconnectEvents()
  })

  // addEventListener("resize", () => {
  //   console.log('Window height:', window.innerHeight);
  //   console.log('Window width:', window.innerWidth);
  // });
})

function intiSimconnectEvents() {
  window.ipcRenderer.send('init-simconnector')

  window.ipcRenderer.on('simconnect-simstate-connected', (event, connected: boolean) => {
    appState.loading = false
    simState.connected = connected
  })

  window.ipcRenderer.on('simconnect-simstate-exception', (event, exception) => {
    appState.loading = false
    simState.exception = exception
  })

  window.ipcRenderer.on('simconnect-paused', (event, paused) => {
    simState.paused = paused
  })

  window.ipcRenderer.on('simconnect-closed', () => {
    simState.paused = false
    simState.connected = false
  })

  window.ipcRenderer.on('simconnect-flightdata', (event, data: FlightStateInterface) => {
    if (flightIsOnNullIsland(data)) {
      flightState.$reset()
    } else {
      flightState.latitude = data.latitude
      flightState.longitude = data.longitude
      flightState.altitude = data.altitude
      flightState.altitudeAboveGround = data.altitudeAboveGround
      flightState.heading = data.heading
      flightState.headingTrue = data.headingTrue
      flightState.degreesBank = data.degreesBank
      flightState.degreesPitch = data.degreesPitch
      flightState.airSpeedTrue = data.airSpeedTrue
      flightState.airSpeedIndicated = data.airSpeedIndicated
      flightState.verticalSpeed = data.verticalSpeed
    }
  })
}

/**
 * Checks if the flight is approximately at the geographic coordinates (0,0).
 * 
 * This function determines whether the given flight's latitude and longitude
 * are within a specified threshold of zero. It's useful for identifying if the
 * flight is near the "null island" point, which is a common default for undefined
 * geographic data.
 *
 * @param {FlightStateInterface} data - An object containing the flight's current state,
 * including its latitude and longitude.
 * @returns {boolean} - Returns `true` if the flight is within the threshold of (0,0),
 * otherwise returns `false`.
 */
function flightIsOnNullIsland(data: FlightStateInterface): boolean {
  const threshold = 0.05;
  return Math.abs(data.latitude) < threshold && Math.abs(data.longitude) < threshold;
}
</script>

<template>
  <Transition name="fade">
    <div v-if="settingsLoaded" class="container">
      <LoadingBarComponent v-if="appState.loading" />
      <HeaderComponent />
      <main v-if="simState.connected" class="main">
      <!-- <main v-if="true" class="main"> -->
        <MapComponent :longitude="flightState.longitude" :latitude="flightState.latitude" :heading-true="flightState.headingTrue" />
        <InfoPanelComponent />
        <GeonamesPanelComponent />
      </main>
      <div v-else>
        <ConnectionInformationComponent />
      </div>
      <div v-if="debug" class="debug">
        <p>Sim connected: {{ simState.connected }}</p>
        <p>Sim exception: {{ simState.exception }}</p>
        <p>Sim paused: {{ simState.paused }}</p>
        <br />
        <p>latitude: {{ flightState.latitude }}°</p>
        <p>longitude: {{ flightState.longitude }}°</p>
        <p>altitude: {{ flightState.altitude }}&nbsp;ft</p>
        <p>altitudeAboveGround: {{ flightState.altitudeAboveGround }}&nbsp;ft</p>
        <p>heading: {{ flightState.heading }}°</p>
        <p>headingTrue: {{ flightState.headingTrue }}°</p>
        <p>degreesBank: {{ flightState.degreesBank }}&nbsp;°</p>
        <p>degreesPitch: {{ flightState.degreesPitch }}&nbsp;°</p>
        <p>airSpeedTrue: {{ flightState.airSpeedTrue }}&nbsp;kts</p>
        <p>airSpeedIndicated: {{ flightState.airSpeedIndicated }}&nbsp;kts</p>
        <p>verticalSpeed: {{ flightState.verticalSpeed }}&nbsp;ft/min</p>
      </div>
      <SidePanelComponent />
    </div>
  </Transition>
</template>

<style scoped>
.debug {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 99;
  font-size: 1rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.75);

  p {
    margin: 0;
    line-height: 1.2;
  }
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.main {
  height: calc(100% - var(--header-height));
  position: relative;
  margin-top: var(--header-height);
}
</style>
