<script setup lang="ts">
import { useFlightStateStore } from '../stores/flightState'
const flightState = useFlightStateStore()
import PitchComponent from './gui/PitchComponent.vue'
import BankComponent from './gui/BankComponent.vue'
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
      <div class="info-panel__value">{{ flightState.heading }}°</div>
      <div class="info-panel__name">Heading</div>
    </div>
    <div class="info-panel__col">
      <div class="info-panel__value">{{ flightState.altitude }}</div>
      <div class="info-panel__name">ft ASL</div>
    </div>
    <div class="info-panel__col">
      <div class="info-panel__value">{{ flightState.airSpeedIndicated }}</div>
      <div class="info-panel__name">kts IAS</div>
    </div>
    <div class="info-panel__col">
      <div class="info-panel__value">{{ flightState.verticalSpeed }}</div>
      <div class="info-panel__name">ft/min VS</div>
    </div>
    <div class="info-panel__col info-panel__col--nowidth">
      <PitchComponent :pitch="flightState.degreesPitch" />
    </div>
    <div class="info-panel__col info-panel__col--nowidth">
      <BankComponent :bank="flightState.degreesBank" />
    </div>
  </div>
</template>

<style scoped>
.info-panel {
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: 3rem;
  transform: translateX(-50%);
  background-color: var(--color-panels);
  border-radius: 3px;
  /* TODO: grid! */
  display: flex;
  padding: 1rem;
  box-shadow:
    0 0.1rem 0.3rem rgba(0, 0, 0, 0.24),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.48);
}

.info-panel__col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 8.5rem;
  padding: 0 1rem;
  border-right: 1px solid var(--color-background);
}

.info-panel__col:first-of-type {
  padding-left: 0;
  width: 7rem;
}

.info-panel__col:last-of-type {
  padding: 0;
}

.info-panel__col--nowidth {
  border-right: none;
  width: auto;
}

.info-panel__value {
  font-size: 1.6rem;
  color: var(--color-text-highlight);
}

.info-panel__name {
  font-size: 1rem;
  font-weight: 300;
  color: var(--color-text);
}
</style>
