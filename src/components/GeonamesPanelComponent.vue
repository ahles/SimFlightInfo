<script setup lang="ts">
import { useAppStateStore } from '../stores/appState'

const appState = useAppStateStore()
</script>

<template>
  <div class="geonames-panel" v-if="appState.geonamesUsername !== ''">
    <h2 class="geonames-panel__title">Flying over</h2>
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
  display: flex;
  padding: 1rem;
}

.geonames-panel__title {
  font-size: 1.6rem;
  line-height: 1;
}
</style>
