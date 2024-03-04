<script setup lang="ts">
// Vue.js imports
import { ref, onBeforeMount, onUnmounted } from 'vue'
// Pinia stores imports
import { useAppStateStore } from './stores/appState'
import { useSimStateStore } from './stores/simState'
// Composable import
import { useSimConnectForeground } from './simConnectForeground'
// Helper function import
import { getExceptionTextForHumans } from './lib/helpers'
// Components imports
import HeaderComponent from './components/layout/HeaderComponent.vue'
import SidePanelComponent from './components/layout/SidePanelComponent.vue'
import LoadingBarComponent from './components/gui/LoadingBarComponent.vue'
import MapComponent from './components/MapComponent.vue'
import ConnectionInformationComponent from './components/ConnectionInformationComponent.vue'

// Initialize the pinia stores
const appState = useAppStateStore()
const simState = useSimStateStore()

// Use composable to listen for simconnect FlightData
const { latitude, longitude, altitude, altitudeAboveGround, heading, headingTrue, degreesBank, degreesPitch, airSpeedTrue, airSpeedIndicated, verticalSpeed } = useSimConnectForeground()

/**
 * Could the settings be loaded from the file system?
 * "C:\Users\phili\AppData\Roaming\SimFlightInfo\config.json"
 */
const settingsLoaded = ref(false)

/**
 * Set to true if you want to display the debug information
 */
const debug = false

onBeforeMount(() => {
  window.ipcRenderer.invoke('request-settings').then((savedAppState) => {
    settingsLoaded.value = true
    if (savedAppState !== undefined) {
      if (Object.hasOwn(savedAppState, 'geonamesUsername')) {
        appState.geonamesUsername = savedAppState.geonamesUsername
      }
      if (Object.hasOwn(savedAppState, 'wikipediaLinksLanguage')) {
        appState.wikipediaLinksLanguage = savedAppState.wikipediaLinksLanguage
      }
    }
    window.ipcRenderer.invoke('save-settings', {
      geonamesUsername: appState.geonamesUsername,
      wikipediaLinksLanguage: appState.wikipediaLinksLanguage
    })

    initSimconnectEvents()
  })

  // addEventListener("resize", () => {
  //   console.log('Window height:', window.innerHeight);
  //   console.log('Window width:', window.innerWidth);
  // });
})

onUnmounted(() => {
  window.ipcRenderer.removeAllListeners('simconnect-simstate-connected')
  window.ipcRenderer.removeAllListeners('simconnect-simstate-exception')
  window.ipcRenderer.removeAllListeners('simconnect-paused')
  window.ipcRenderer.removeAllListeners('simconnect-closed')
})

function initSimconnectEvents() {
  window.ipcRenderer.send('init-simconnectbackground')

  window.ipcRenderer.on('simconnect-simstate-connected', (event, connected: boolean) => {
    appState.loading = false
    simState.connected = connected
  })

  window.ipcRenderer.on('simconnect-simstate-exception', (event, exception) => {
    appState.loading = false
    simState.exception = getExceptionTextForHumans(exception.code)
  })

  window.ipcRenderer.on('simconnect-paused', (event, paused) => {
    simState.paused = paused
  })

  window.ipcRenderer.on('simconnect-closed', () => {
    simState.paused = false
    simState.connected = false
  })
}
</script>

<template>
  <Transition name="fade">
    <div v-if="settingsLoaded" class="container">
      <LoadingBarComponent v-if="appState.loading" />
      <HeaderComponent />
      <!-- <main v-if="simState.connected" class="main"> -->
      <main v-if="true" class="main">
        <MapComponent :longitude="longitude" :latitude="latitude" :heading-true="headingTrue" :heading="heading" :altitude="altitude" :air-speed-indicated="airSpeedIndicated" :vertical-speed="verticalSpeed" :degrees-pitch="degreesPitch" :degrees-bank="degreesBank" />
      </main>
      <div v-else>
        <ConnectionInformationComponent />
      </div>
      <div v-if="debug" class="debug">
        <p>Sim connected: {{ simState.connected }}</p>
        <p>Sim exception: {{ simState.exception }}</p>
        <p>Sim paused: {{ simState.paused }}</p>
        <br />
        <p>longitude: {{ longitude }}°</p>
        <p>latitude: {{ latitude }}°</p>
        <p>altitude: {{ altitude }}&nbsp;ft</p>
        <p>altitudeAboveGround: {{ altitudeAboveGround }}&nbsp;ft</p>
        <p>heading: {{ heading }}°</p>
        <p>headingTrue: {{ headingTrue }}°</p>
        <p>degreesBank: {{ degreesBank }}&nbsp;°</p>
        <p>degreesPitch: {{ degreesPitch }}&nbsp;°</p>
        <p>airSpeedTrue: {{ airSpeedTrue }}&nbsp;kts</p>
        <p>airSpeedIndicated: {{ airSpeedIndicated }}&nbsp;kts</p>
        <p>verticalSpeed: {{ verticalSpeed }}&nbsp;ft/min</p>
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
  overflow: hidden;
}

.main {
  height: calc(100% - var(--header-height));
  position: relative;
  margin-top: var(--header-height);
}
</style>
