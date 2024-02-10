<script setup lang="ts">
import { onMounted } from 'vue'
import { SimInterface } from './Interfaces'

import { useSimStateStore } from './stores/simState'
import HeaderComponent from "./components/layout/HeaderComponent.vue";
import LoadingBarComponent from "./components/gui/LoadingBarComponent.vue";
const simState = useSimStateStore()

onMounted(() => {
  window.ipcRenderer.on('simconnect-data', (event, data: SimInterface) => {
    // console.log('event', event);
    // console.log('data', data);
    simState.latitude = data.latitude
    simState.longitude = data.longitude
    simState.altitude = data.altitude
    simState.altitudeAboveGround = data.altitudeAboveGround
    simState.heading = data.heading
    simState.degreesBank = data.degreesBank
    simState.degreesPitch = data.degreesPitch
    simState.airSpeedTrue = data.airSpeedTrue
    simState.airSpeedIndicated = data.airSpeedIndicated
    simState.verticalSpeed = data.verticalSpeed
  })
})
</script>

<template>
  <HeaderComponent />
  <main class="main">
    <div class="debug">
      <p>Latitude:  {{ simState.latitude }}</p>
      <p>Longitude: {{ simState.longitude }}</p>
      <p>Altitude: {{ simState.altitude }}</p>
      <p>Altitude above ground: {{ simState.altitudeAboveGround }}</p>
      <p>Heading: {{ simState.heading }}</p>
      <p>Bank: {{ simState.degreesBank }}</p>
      <p>Pitch: {{ simState.degreesPitch }}</p>
      <p>Air Speed True: {{ simState.airSpeedTrue }}</p>
      <p>Air Speed Indicated: {{ simState.airSpeedIndicated }}</p>
      <p>Vertical Speed: {{ simState.verticalSpeed }}</p>
    </div>
  </main>
  <LoadingBarComponent />
</template>

<style>
.debug {
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
