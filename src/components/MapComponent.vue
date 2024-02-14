<script setup lang="ts">
import { onMounted } from 'vue'
import { initMap } from '../modules/map'

import { useAppStateStore } from '../stores/appState'

const appState = useAppStateStore()

const props = defineProps<{
  longitude: number,
  latitude: number,
  heading: number
}>()

onMounted(async () => {
  await initMap(props.longitude, props.latitude, props.heading)
  appState.loading = false
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
