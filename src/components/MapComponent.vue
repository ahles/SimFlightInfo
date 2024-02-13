<script setup lang="ts">
import { onMounted } from 'vue'
import { initMap } from '../modules/map'

import { useAppStateStore } from '../stores/appState'
import { useFlightStateStore } from '../stores/flightState'

const appState = useAppStateStore()
const flightState = useFlightStateStore()

onMounted(async () => {
  await initMap(flightState.longitude, flightState.latitude)
  appState.loading = false;
})
</script>

<template>
    <div id="map"></div>
</template>

<style scoped>
#map {
    width: 100%;
    height: 100%;
}
</style>
