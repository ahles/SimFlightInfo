<script setup lang="ts">
import { useFlightStateStore } from '../../stores/flightState'
const flightState = useFlightStateStore()
import Pitch from './Pitch.vue'
import Bank from './Bank.vue'
</script>

<template>
  <div class="info-panel">
    <div class="info-panel__col">
      <div class="info-panel__value">{{ flightState.latitude.toFixed(2) }}°</div>
      <div class="info-panel__name">Latitude</div>
    </div>
    <div class="info-panel__col">
      <div class="info-panel__value">{{ flightState.longitude.toFixed(2) }}°</div>
      <div class="info-panel__name">Longitude</div>
    </div>
    <div class="info-panel__col">
      <div class="info-panel__value">{{ flightState.heading.toFixed(0) }}°</div>
      <div class="info-panel__name">Heading</div>
    </div>
    <div class="info-panel__col">
      <div class="info-panel__value">{{ flightState.altitude.toFixed(0) }}&nbsp;ft</div>
      <div class="info-panel__name">ASL</div>
    </div>
    <div class="info-panel__col">
      <div class="info-panel__value">{{ flightState.airSpeedTrue.toFixed(0) }}&nbsp;kts</div>
      <div class="info-panel__name">GS</div>
    </div>
    <!-- <div class="info-panel__col">
      <div class="info-panel__value">{{ flightState.airSpeedIndicated.toFixed(0) }}&nbsp;kts</div>
      <div class="info-panel__name">airSpeedIndicated</div>
    </div> -->
    <div class="info-panel__col">
      <Pitch :pitch="flightState.degreesPitch" />
    </div>
    <div class="info-panel__col">
      <Bank :bank="flightState.degreesBank" />
    </div>
  </div>
</template>

<style scoped>
.info-panel {
  position: absolute;
  z-index: 20;
  left: 50%;
  bottom: 3rem;
  /* width: 50rem; */
  /* height: 5rem; */
  transform: translateX(-50%);
  background-color: var(--color-panels);
  border-radius: 3px;
  display: flex;
}

.info-panel__col {
  width: 10rem;
  padding: 1rem;
}

.info-panel__value {
  font-size: 2rem;
  color: var(--color-text-highlight);
}

.info-panel__name {
  font-size: 1.2rem;
  font-weight: 300;
}
</style>
