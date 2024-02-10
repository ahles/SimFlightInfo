<script setup lang="ts">
import { onMounted } from 'vue'

import { useSimStateStore } from './stores/simState'
const simState = useSimStateStore()

onMounted(() => {
  window.ipcRenderer.on('simconnect-data', (event, data) => {
    // console.log('event', event);
    // console.log('data', data);
    simState.latitude = data.latitude
    simState.longitude = data.longitude
    simState.altitude = data.altitude
    simState.kohlsmann = data.kohlsmann
    simState.verticalSpeed = data.verticalSpeed
  })
})
</script>

<template>
<p>Latitude:  {{ simState.latitude }}</p>
<p>Longitude: {{ simState.longitude }}</p>
<p>Altitude: {{ simState.altitude }}</p>
<p>Hg kohlsmann: {{ simState.kohlsmann }}</p>
<p>VSpeed: {{ simState.verticalSpeed }}</p>
</template>

<style>

</style>
