<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useAppStateStore } from '../../stores/appState'
import IconSaveComponent from '../icons/IconSaveComponent.vue'
import ButtonComponent from '../gui/ButtonComponent.vue'

const appState = useAppStateStore()
const localGeonamesUsername = ref('')
const saveSuccess = ref(false)
const saveError = ref(false)

onMounted(() => {
  localGeonamesUsername.value = appState.geonamesUsername
})

function saveUsername() {
  window.ipcRenderer.invoke('save-settings', {
    geonamesUsername: localGeonamesUsername.value
  }).then((result) => {
    localGeonamesUsername.value = result.geonamesUsername
    appState.geonamesUsername = result.geonamesUsername
    saveSuccess.value = true
  }).catch((error) => {
    alert(error)
    saveError.value = true
  })
}

watch(saveSuccess, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      saveSuccess.value = false
    }, 1000)
  }
})

watch(saveError, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      saveError.value = false
    }, 1000)
  }
})

</script>

<template>
    <div class="geonames-username-input" :class="{ success: saveSuccess, error: saveError }">
      <label class="geonames-username-input__label" for="geonames">Enter your Geoname username:</label>
      <input id="geonames" v-model="localGeonamesUsername" class="geonames-username-input__input" type="text" name="geonames" placeholder="enter your username" @keyup.enter="saveUsername" />
      <ButtonComponent class="geonames-username-input__button" title="Save geonames username" variant="icon" @click="saveUsername"><IconSaveComponent /></ButtonComponent>
    </div>
</template>

<style scoped>
.geonames-username-input {
  display: flex;
  align-items: center;
  color: var(--color-text);
  transition: color .1s ease-in;

  &.success {
    color: var(--color-success);
    transition: color .1s ease-in;
  }

  &.error {
    color: var(--color-error);
    transition: color .1s ease-in;
  }
}

.geonames-username-input__input {
  width: 100%;
  color: currentColor;
  background-color: var(--color-background);
  border: 1px solid currentColor;
  padding: 0.5rem 0.75rem;
  font-family: inherit;
  font-size: 1.4rem;
  outline: none;
  font-weight: 300;
  margin-right: 1rem;
}

.geonames-username-input__input::placeholder {
  color: var(--color-text);
  opacity: 0.5;
}

.geonames-username-input__label {
  display: none;
  font-size: 1rem;
}

.geonames-username-input__button {
  color: currentColor;
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
