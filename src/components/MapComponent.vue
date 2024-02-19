<script setup lang="ts">
import { onMounted, watch } from 'vue'
import PlaneMarkerComponent from './gui/PlaneMarkerComponent.vue'
import MapService from '../lib/MapService'

import { useAppStateStore } from '../stores/appState'

const appState = useAppStateStore()

const props = defineProps<{
  longitude: number
  latitude: number
  headingTrue: number
}>()

const mapService = new MapService()

onMounted(async () => {
  await mapService.initMap(props.longitude, props.latitude)
  appState.loading = false
})

watch(
  () => props.longitude,
  () => {
    mapService.updatePosition(props.longitude, props.latitude)
  }
)
</script>

<template>
  <div id="map"></div>
  <PlaneMarkerComponent :heading-true="headingTrue" />
</template>

<style>
#map {
  width: 100%;
  height: 100%;

  .ol-zoom {
    left: auto;
    top: 1rem;
    right: 1rem;
  }

  .ol-control {
    display: none;
    button {
      background-color: var(--color-background);
      color: var(--color-text);
      border: none;
      outline: none;
      opacity: 0.7;
      cursor: pointer;
    }
    button:hover {
      background-color: var(--color-panels);
      color: var(--color-text-highlight);
      border: none;
      outline: none;
    }
  }
}
</style>
