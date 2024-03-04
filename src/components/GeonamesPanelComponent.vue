<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStateStore } from '../stores/appState'
import { flightIsOnNullIsland } from '../lib/helpers'
import { CountryInterface } from '../Interfaces'
import GeonamesAPI from '../GeonamesAPI'
import ButtonComponent from './gui/ButtonComponent.vue'
import IconReloadComponent from './icons/IconReloadComponent.vue'
import IconAlertComponent from './icons/IconAlertComponent.vue'

const props = defineProps<{
  longitude: number
  latitude: number
}>()

const appState = useAppStateStore()
const { geonamesPanelVisible, geonamesUsername } = storeToRefs(appState)

const geonames = new GeonamesAPI(appState.geonamesUsername)
const geonamesErrors = ref<string[]>([])

const hasErrors = computed(() => {
  if (
    geonamesUsername.value === '' || typeof geonamesUsername.value === 'undefined' // geonames username errors
    || flightIsOnNullIsland(props.longitude, props.latitude) // Is flight on the null island?
    || geonamesErrors.value.length > 0 // Are there any additional geonames errors
  ) {
    return true
  }
  return false
})

onMounted(async () => {
  geonames.setLocation(props.longitude, props.latitude)
  await getGeonamesInformation()
})

async function getGeonamesInformation() {
  appState.loading = true
  geonames.setLocation(props.longitude, props.latitude)
  geonames.setLanguage(appState.wikipediaLinksLanguage)
  const country: CountryInterface | null = await geonames.getCountry()
    .catch((error) => {
      geonamesErrors.value.push(error)
      return null
    })
  console.log('country', country);
  appState.loading = false
}
</script>

<template>
  <div v-if="geonamesPanelVisible" class="geonames-panel">
    <div class="geonames-panel__header">
      <h2 class="geonames-panel__title">Geonames</h2>
      <ButtonComponent v-if="geonamesUsername !== ''" class="geonames-panel__reload" title="refresh" variant="icon">
        <IconReloadComponent />
      </ButtonComponent>
    </div>
    <div v-if="hasErrors" class="geonames-panel__error">
      <div class="geonames-panel__error-icon">
        <IconAlertComponent />
      </div>
      <div class="geonames-panel__error-text">
        <p v-if="geonamesUsername === '' || typeof geonamesUsername === 'undefined'">No geonames username configured</p>
        <p v-if="flightIsOnNullIsland(longitude, latitude)">Flight is on null island</p>
      </div>
    </div>
    <div v-else class="geonames-panel__content">

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
  min-width: 20rem;
  max-width: 30rem;
  box-shadow:
    0 0.1rem 0.3rem rgba(0, 0, 0, 0.24),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.48);
}

.geonames-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.geonames-panel__title {
  font-size: 1.6rem;
  line-height: 1;
}

.geonames-panel__error {
  margin-top: 1rem;
  padding-top: 1rem;
  display: flex;
  align-items: flex-start;
  border-top: 1px solid var(--color-text)
}

.geonames-panel__error-icon {
  padding-right: 0.5rem;

  svg {
    width: 2rem;
    margin-top: .2rem;
  }
}
</style>
