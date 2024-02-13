<script setup lang="ts">
import { onMounted } from 'vue'
import { FlightStateInterface } from './Interfaces'
import { useAppStateStore } from './stores/appState'
import { useSimStateStore } from './stores/simState'
import { useFlightStateStore } from './stores/flightState'
import HeaderComponent from "./components/layout/HeaderComponent.vue";
import LoadingBarComponent from "./components/gui/LoadingBarComponent.vue";
import Map from './components/Map.vue'
import ConnectionInformation from './components/ConnectionInformation.vue'
import InfoPanelComponent from './components/gui/InfoPanelComponent.vue'

const appState = useAppStateStore()
const simState = useSimStateStore()
const flightState = useFlightStateStore()

onMounted(() => {
  window.ipcRenderer.on('simconnect-simstate-connected', (event, connected: boolean) => {
    appState.loading = false
    simState.connected = connected
  })

  // TODO: not receiving
  window.ipcRenderer.on('simconnect-simstate-exception', (event, exception) => {
    appState.loading = false
    simState.exception = exception
  })

  window.ipcRenderer.on('simconnect-flightdata', (event, data: FlightStateInterface) => {
    // console.log('event', event);
    // console.log('data', data);
    flightState.latitude = data.latitude
    flightState.longitude = data.longitude
    flightState.altitude = data.altitude
    flightState.altitudeAboveGround = data.altitudeAboveGround
    flightState.heading = data.heading
    flightState.degreesBank = data.degreesBank
    flightState.degreesPitch = data.degreesPitch
    flightState.airSpeedTrue = data.airSpeedTrue
    flightState.airSpeedIndicated = data.airSpeedIndicated
    flightState.verticalSpeed = data.verticalSpeed
  })
})
</script>

<template>
  <LoadingBarComponent v-if="appState.loading"/>
  <HeaderComponent />
  <InfoPanelComponent />
  <main class="main" v-if="simState.connected">
    <Map/>
  </main>
  <div v-else>
    <ConnectionInformation />
  </div>
  <div class="debug">
    <p>Sim connected: {{ simState.connected }}</p>
    <p>Sim exception: {{ simState.exception }}</p>

    <br>
    <p>Latitude: {{ flightState.latitude }}</p>
    <p>Longitude: {{ flightState.longitude }}</p>
    <p>Altitude: {{ flightState.altitude }}</p>
    <p>Altitude above ground: {{ flightState.altitudeAboveGround }}</p>
    <p>Heading: {{ flightState.heading }}</p>
    <p>Bank: {{ flightState.degreesBank }}</p>
    <p>Pitch: {{ flightState.degreesPitch }}</p>
    <p>Air Speed True: {{ flightState.airSpeedTrue }}</p>
    <p>Air Speed Indicated: {{ flightState.airSpeedIndicated }}</p>
    <p>Vertical Speed: {{ flightState.verticalSpeed }}</p>
  </div>
</template>

<style>
.debug {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 10;
  font-size: 1rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.75);

  p {
    margin: 0;
  }
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
