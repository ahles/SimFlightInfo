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
  window.ipcRenderer.send('request-settings')

  window.ipcRenderer.on('read-settings', (response, data) => {
    settingsLoaded.value = true
    appState.geonamesUsername = data.geonamesUsername
    // console.log('App.onBeforeMount() app Settings loaded from filesystem', data);
    intiSimconnectEvents()
  })
})

function intiSimconnectEvents() {
  window.ipcRenderer.send('init-simconnector')
  // console.log('App.intiSimconnectEvents()');
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

  window.ipcRenderer.on('simconnect-closed', () => {
    simState.active = false
    simState.connected = false
  })

  window.ipcRenderer.on('simconnect-flightdata', (event, data: FlightStateInterface) => {
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
  })
}
</script>

<template>
  <Transition name="fade">
    <div v-if="settingsLoaded">
      <LoadingBarComponent v-if="appState.loading" />
      <HeaderComponent />
      <main v-if="simState.connected" class="main">
        <MapComponent :longitude="flightState.longitude" :latitude="flightState.latitude" :headingTrue="flightState.headingTrue" />
        <InfoPanelComponent />
        <GeonamesPanelComponent />
      </main>
      <div v-else>
        <ConnectionInformationComponent />
      </div>
      <div v-if="debug" class="debug">
        <p>Sim connected: {{ simState.connected }}</p>
        <p>Sim exception: {{ simState.exception }}</p>
        <p>Sim active: {{ simState.active }}</p>
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
  position: relative;
}

.main {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: var(--header-height)
}
</style>
