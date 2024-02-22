<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { CountryInterface } from '../Interfaces'
import GeonamesAPI from '../GeonamesAPI'
import { useAppStateStore } from '../stores/appState'
import ButtonComponent from './gui/ButtonComponent.vue'
import IconAlertComponent from './icons/IconAlertComponent.vue'
import IconReloadComponent from './icons/IconReloadComponent.vue'

const appState = useAppStateStore()

const props = defineProps<{
  longitude: Number
  latitude: Number
}>()

const geonames = new GeonamesAPI(appState.geonamesUsername)
const geonamesValidResponse = ref(false)
const countryCode = ref('')
const countryName = ref('')
const oceanName = ref('')

onMounted(async () => {
  geonames.setCoordinate(props.longitude, props.latitude)
  await getGeonamesInformation()
})

const wikipediaCountryLink = computed(() => {
  if (countryName.value) {
    return `https://en.wikipedia.org/wiki/${countryName.value.replace(' ', '_')}`
  }
  return ''
})

async function getGeonamesInformation() {
  geonames.setCoordinate(props.longitude, props.latitude)
  const country: CountryInterface | null = await geonames.getCountry()
  if (country !== null) {
    countryCode.value = country.code
    countryName.value = country.name
    geonamesValidResponse.value = true
  } else {
    const ocean = await geonames.getOcean()
    if (ocean !== null) {
      oceanName.value = ocean
      geonamesValidResponse.value = true
    }
  }
}
</script>

<template>
  <div v-if="appState.geonamesPanelVisible" class="geonames-panel">
    <div class="geonames-panel__header">
      <h2 class="geonames-panel__title">Flying over</h2>
      <ButtonComponent class="geonames-panel__reload" title="refresh" variant="icon" @click="getGeonamesInformation">
        <IconReloadComponent />
      </ButtonComponent>
    </div>
    <div v-if="appState.geonamesUsername !== '' && geonamesValidResponse" class="geonames-panel__content">
      <div v-if="countryCode !== '' && wikipediaCountryLink !== ''">
        <p class="geonames-panel__contry">
          <a :href="wikipediaCountryLink" target="_blank" rel="noopener">{{ countryName }}</a>
        </p>
        <img :src="`https://img.geonames.org/flags/x/${countryCode.toLowerCase()}.gif`" class="geonames-panel__flag" />
      </div>
      <div v-if="oceanName !== ''">
        <p>{{ oceanName }}</p>
      </div>
    </div>
    <div v-else class="geonames-panel__error">
      <IconAlertComponent />
      <p v-if="appState.geonamesUsername === ''">No geonames username configured</p>
      <p v-if="geonamesValidResponse === false">Could not fetch from geonames</p>
    </div>
    <div class="geonames-debug">
      <p>Longitude: {{ longitude }}</p>
      <p>Latitude: {{ latitude }}</p>
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
  width: 20rem;
  box-shadow:
    0 0.1rem 0.3rem rgba(0, 0, 0, 0.24),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.48);
}

.geonames-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.geonames-panel__title {
  font-size: 1.6rem;
  line-height: 1;
  margin-bottom: 1rem;
}

.geonames-panel__reload {
  width: 1.6rem;
  height: 1.6rem;
}

.geonames-panel__contry {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.geonames-panel__flag {
  height: 3rem;
}

.geonames-panel__error {
  color: var(--color-error);
  display: flex;
  font-size: 1.2rem;

  svg {
    width: 1.2rem;
    margin-right: 0.4rem;
  }
}

.geonames-debug {
  margin-top: 1rem;
  font-size: 1rem;
  opacity: 0.75;
}
</style>
