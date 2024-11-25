<script setup lang="ts">
import { useAppStateStore } from '../../stores/appState'

const props = defineProps<{
  id: string,
  name: string
}>()

const appState = useAppStateStore()

function saveLayer() {
  // TODO: await?
  window.ipcRenderer
    .invoke('save-settings', {
      activeLayer: props.id
    })
    .then(() => {
      appState.activeLayer = props.id
    })
    .catch((error) => {
      alert(error)
    })
}
</script>

<template>
  <li class="layer-item">
    <input :id="id" name="layer" :value="name" type="radio" :checked="appState.activeLayer === id" @change="saveLayer" />
    <label :for="id">{{ name }}</label>
  </li>
</template>

<style scoped>
.layer-item {
  display: flex;
  align-items: center;

  input {
    margin: 0 1rem 0 0;
  }

  label {
    font-size: inherit;
    font-weight: 300;
  }
}
</style>
