<script setup lang="ts">
import { onMounted, watch } from 'vue'
import PlaneMarkerComponent from './gui/PlaneMarkerComponent.vue'
import { initMap, updatePosition } from '../modules/map'

import { useAppStateStore } from '../stores/appState'

const appState = useAppStateStore()

const props = defineProps<{
  longitude: number,
  latitude: number,
  heading: number
}>()

onMounted(async () => {
  await initMap(props.longitude, props.latitude)
  appState.loading = false
})

watch(() => props.longitude, () => {
  updatePosition(props.longitude, props.latitude)
});
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
