<script setup lang="ts">
import { onMounted } from 'vue'

import { useSimStateStore } from './stores/simState'
const simState = useSimStateStore()

onMounted(() => {
  window.ipcRenderer.on('simconnect-data', (event, data) => {
    console.log('event', event);
    console.log('data', data);
    simState.latitude = data.latitude
    simState.longitude = data.longitude
  })
})

</script>

<template>
<p>Latitude:  {{ simState.latitude }}</p>
<p>Longitude: {{ simState.longitude }}</p>
</template>

<style>

</style>
