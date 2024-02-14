<script setup lang="ts">
import { onMounted } from 'vue'
// import type Map from 'ol/Map'
import PlaneMarkerComponent from './gui/PlaneMarkerComponent.vue'
import { initMap } from '../modules/map'

import { useAppStateStore } from '../stores/appState'

const appState = useAppStateStore()

// let map: Map

const props = defineProps<{
  longitude: number,
  latitude: number,
  heading: number
}>()

onMounted(async () => {
  await initMap(props.longitude, props.latitude)
  appState.loading = false
})
</script>

<template>
  <div id="map"></div>
  <PlaneMarkerComponent :heading="heading" />
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
