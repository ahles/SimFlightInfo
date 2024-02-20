<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStateStore } from '../stores/appState'
import { useFlightStateStore } from '../stores/flightState'
import IconAlertComponent from './icons/IconAlertComponent.vue';

const appState = useAppStateStore()
const flightState = useFlightStateStore()

onMounted(() => {
  console.log('longitude', flightState.longitude);
  console.log('latitude', flightState.latitude);
})
</script>

<template>
  <div class="geonames-panel">
      <h2 class="geonames-panel__title">Flying over</h2>
      <div v-if="appState.geonamesUsername !== ''" class="geonames-panel__content">
        
      </div>
      <div v-else class="geonames-panel__error">
        <IconAlertComponent />
        <p>No geonames username configured</p>
      </div>
  </div>
</template>

<style scoped>
.geonames-panel {
  position: absolute;
  z-index: 10;
  top: 2rem;
  left: 2rem;
  background-color: var(--color-panels);
  border-radius: 3px;
  padding: 1rem;
}

.geonames-panel__title {
  font-size: 1.6rem;
  line-height: 1;
  margin-bottom: 1rem;
}

.geonames-panel__error {
  color: var(--color-error);
  display: flex;
  font-size: 1.2rem;

  svg {
    width: 1.2rem;
    margin-right: 0.4rem;
  }
}
</style>
