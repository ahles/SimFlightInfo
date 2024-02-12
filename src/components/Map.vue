<script setup lang="ts">
import { onMounted } from 'vue'
import type { Map } from 'ol'
import { initMap } from '../modules/map'

import { useFlightStateStore } from '../stores/flightState'

const flightState = useFlightStateStore()

let map: Map

onMounted(async () => {
    map = await initMap(flightState.longitude, flightState.latitude)
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