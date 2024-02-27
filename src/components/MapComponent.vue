<script setup lang="ts">
import { onMounted, watch } from 'vue'
import PlaneMarkerComponent from './gui/PlaneMarkerComponent.vue'
import InfoPanelComponent from './InfoPanelComponent.vue'
import GeonamesPanelComponent from './GeonamesPanelComponent.vue'
import MapService from '../lib/MapService'

import { useAppStateStore } from '../stores/appState'
import { useSimStateStore } from '../stores/simState'
// import { GeonamesWikipedia } from '../Interfaces'

const appState = useAppStateStore()
const simState = useSimStateStore()

const props = defineProps<{
  longitude: number
  latitude: number
  headingTrue: number
  heading: Number
  altitude: Number
  airSpeedIndicated: Number
  verticalSpeed: Number
  degreesPitch: Number
  degreesBank: Number
}>()

const mapService = new MapService()

watch(
  () => props.longitude,
  () => {
    mapService.updatePosition(props.longitude, props.latitude)
  }
)

watch(
  () => simState.wikipediaMarker,
  (newValue) => {
    if (newValue) {
      mapService.removeWikipediaMarker()
      mapService.addWikipediaMarker(newValue)
    } else {
      mapService.removeWikipediaMarker()
    }
  }
)

onMounted(async () => {
  await mapService.initMap(props.longitude, props.latitude)
  appState.loading = false
})
</script>

<template>
  <div id="map"></div>
  <PlaneMarkerComponent :heading-true="headingTrue" />
  <InfoPanelComponent :longitude="longitude" :latitude="latitude" :heading="heading" :altitude="altitude" :air-speed-indicated="airSpeedIndicated" :vertical-speed="verticalSpeed" :degrees-pitch="degreesPitch" :degrees-bank="degreesBank" />
  <GeonamesPanelComponent :longitude="longitude" :latitude="latitude" />
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
