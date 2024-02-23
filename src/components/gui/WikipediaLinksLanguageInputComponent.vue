<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useAppStateStore } from '../../stores/appState'
import IconSaveComponent from '../icons/IconSaveComponent.vue'
import ButtonComponent from '../gui/ButtonComponent.vue'

const appState = useAppStateStore()
const localWikipadiaLinksLanugage = ref('')
const saveSuccess = ref(false)
const saveError = ref(false)

onMounted(() => {
  localWikipadiaLinksLanugage.value = appState.wikipediaLinksLanguage
})

function saveLanguage() {
  window.ipcRenderer
    .invoke('save-settings', {
      wikipediaLinksLanguage: localWikipadiaLinksLanugage.value
    })
    .then((result) => {
      localWikipadiaLinksLanugage.value = result.wikipediaLinksLanguage
      appState.wikipediaLinksLanguage = result.wikipediaLinksLanguage
      saveSuccess.value = true
    })
    .catch((error) => {
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
  <div class="wikipedia-links-language-input" :class="{ success: saveSuccess, error: saveError }">
    <label class="wikipedia-links-language-input__label" for="wikipedia-links-language">Enter the desired Wikipedia links language:</label>
    <input id="wikipedia-links-language" v-model="localWikipadiaLinksLanugage" class="wikipedia-links-language-input__input" type="text" name="wikipedia-links-language" placeholder="enter your username" maxlength="2" @keyup.enter="saveLanguage" />
    <ButtonComponent class="wikipedia-links-language-input__button" title="Save wikipedia links lanugage" variant="icon" @click="saveLanguage"><IconSaveComponent /></ButtonComponent>
  </div>
</template>

<style scoped>
.wikipedia-links-language-input {
  display: flex;
  align-items: center;
  color: var(--color-text);
  transition: color 0.1s ease-in;

  &.success {
    color: var(--color-success);
    transition: color 0.1s ease-in;
  }

  &.error {
    color: var(--color-error);
    transition: color 0.1s ease-in;
  }
}

.wikipedia-links-language-input__input {
  width: 5rem;
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

.wikipedia-links-language-input__input::placeholder {
  color: var(--color-text);
  opacity: 0.5;
}

.wikipedia-links-language-input__label {
  display: none;
  font-size: 1rem;
}

.wikipedia-links-language-input__button {
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
