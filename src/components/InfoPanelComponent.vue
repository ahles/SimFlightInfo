<script setup lang="ts">
import PitchComponent from './gui/PitchComponent.vue'
import BankComponent from './gui/BankComponent.vue'
import { useAppStateStore } from '../stores/appState'

const appState = useAppStateStore()

defineProps<{
  longitude: Number
  latitude: Number
  heading: Number
  altitude: Number
  airSpeedIndicated: Number
  verticalSpeed: Number
  degreesPitch: Number
  degreesBank: Number
}>()
</script>

<template>
  <div v-if="appState.infoPanelVisible" class="info-panel">
    <div class="info-panel__col">
      <div class="info-panel__value">{{ longitude.toFixed(3) }}°</div>
      <div class="info-panel__name">Longitude</div>
    </div>
    <div class="info-panel__col">
      <div class="info-panel__value">{{ latitude.toFixed(3) }}°</div>
      <div class="info-panel__name">Latitude</div>
    </div>
    <div class="info-panel__col">
      <div class="info-panel__value">{{ heading }}°</div>
      <div class="info-panel__name">Heading</div>
    </div>
    <div class="info-panel__col">
      <div class="info-panel__value">{{ altitude }}</div>
      <div class="info-panel__name">ft ASL</div>
    </div>
    <div class="info-panel__col">
      <div class="info-panel__value">{{ airSpeedIndicated }}</div>
      <div class="info-panel__name">kts IAS</div>
    </div>
    <div class="info-panel__col">
      <div class="info-panel__value">{{ verticalSpeed }}</div>
      <div class="info-panel__name">ft/min VS</div>
    </div>
    <div class="info-panel__col info-panel__col--nowidth">
      <PitchComponent :pitch="degreesPitch" />
    </div>
    <div class="info-panel__col info-panel__col--nowidth">
      <BankComponent :bank="degreesBank" />
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
  width: 10rem;
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
