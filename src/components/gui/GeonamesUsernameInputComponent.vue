<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStateStore } from '../../stores/appState'
import IconSaveComponent from '../icons/IconSaveComponent.vue'
import ButtonComponent from '../gui/ButtonComponent.vue'

const appState = useAppStateStore()
const localGeonamesUsername = ref('')

onMounted(() => {
  localGeonamesUsername.value = appState.geonamesUsername
})

function saveUsername() {
  window.ipcRenderer.send('save-settings', {
    geonamesUsername: localGeonamesUsername.value
  })
}
</script>

<template>
    <div class="sidebar__row">
      <label class="textinput__label" for="geonames">Enter your Geoname username:</label>
      <input id="geonames" ref="geonames" v-model="localGeonamesUsername" class="textinput" type="text" name="geonames" placeholder="enter your username" />
      <ButtonComponent title="Save geonames username" type="icon" @click="saveUsername"><IconSaveComponent /></ButtonComponent>
    </div>
</template>

<style scoped>
.textinput {
  width: 100%;
  color: var(--color-text);
  background-color: var(--color-background);
  border: 1px solid var(--color-text);
  padding: 0.5rem 0.75rem;
  font-family: inherit;
  font-size: 1.2rem;
  outline: none;
  font-weight: 300;
   margin-right: 1rem;
}

.textinput:focus {
  border-color: var(--color-text-highlight);
  transition: border-color 0.2s ease-in;
}

.textinput::placeholder {
  color: var(--color-text);
  opacity: 0.5;
}

.textinput__label {
  display: none;
  font-size: 1rem;
}

.slide-enter-active {
  transition: transform 0.3s ease-out;
}

.slide-leave-active {
  transition: transform 0.3s ease-in;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(var(--sidepanel-width));
}
</style>
