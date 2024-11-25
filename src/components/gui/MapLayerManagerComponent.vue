<script setup lang="ts">
import { layerManager } from '../../lib/layerManager';
import MapLayerManagerLayerComponent from './MapLayerManagerLayerComponent.vue';
</script>

<template>
  <div class="map-layer-manager">
    <ul>
      <MapLayerManagerLayerComponent v-for="(layer, index) in layerManager" :id="layer.id" :key="index" :name="layer.name" />
    </ul>
  </div>
</template>

<style scoped>
.map-layer-manager {
  font-size: 1.2rem;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
}
</style>
