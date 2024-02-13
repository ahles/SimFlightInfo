<script setup lang="ts">
import { onMounted } from 'vue'
import { FlightStateInterface } from './Interfaces'
import { useAppStateStore } from './stores/appState'
import { useSimStateStore } from './stores/simState'
import { useFlightStateStore } from './stores/flightState'
import HeaderComponent from './components/layout/HeaderComponent.vue'
import SidePanelComponent from './components/layout/SidePanelComponent.vue'
import LoadingBarComponent from './components/gui/LoadingBarComponent.vue'
import MapComponent from './components/MapComponent.vue'
import ConnectionInformationComponent from './components/ConnectionInformationComponent.vue'
import InfoPanelComponent from './components/gui/InfoPanelComponent.vue'

const appState = useAppStateStore()
const simState = useSimStateStore()
const flightState = useFlightStateStore()

onMounted(() => {
  window.ipcRenderer.on('simconnect-simstate-connected', (event, connected: boolean) => {
    appState.loading = false
    simState.connected = connected
  })

  window.ipcRenderer.on('simconnect-simstate-exception', (event, exception) => {
    appState.loading = false
    simState.exception = exception
  })

  window.ipcRenderer.on('simconnect-active', (event, active) => {
    simState.active = active
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
  <LoadingBarComponent v-if="appState.loading" />
  <HeaderComponent />
  <main v-if="simState.connected" class="main">
    <MapComponent />
    <InfoPanelComponent v-if="simState.active"/>
  </main>
  <div v-else>
    <ConnectionInformationComponent />
  </div>
  <div class="debug">
    <p>Sim connected: {{ simState.connected }}</p>
    <p>Sim exception: {{ simState.exception }}</p>
    <p>Sim active: {{ simState.active }}</p>

    <br />
    <p>latitude: {{ flightState.latitude }}</p>
    <p>longitude: {{ flightState.longitude }}</p>
    <p>altitude: {{ flightState.altitude }}</p>
    <p>altitudeAboveGround: {{ flightState.altitudeAboveGround }}</p>
    <p>heading: {{ flightState.heading }}</p>
    <p>degreesBank: {{ flightState.degreesBank }}</p>
    <p>PidegreesPitchtch: {{ flightState.degreesPitch }}</p>
    <p>airSpeedTrue: {{ flightState.airSpeedTrue }}</p>
    <p>airSpeedIndicated: {{ flightState.airSpeedIndicated }}</p>
    <p>verticalSpeed: {{ flightState.verticalSpeed }}</p>
  </div>
  <SidePanelComponent />
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
    line-height: 1.2;
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
