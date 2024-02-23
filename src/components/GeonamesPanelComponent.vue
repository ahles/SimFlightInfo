<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { CountryInterface, GeonamesWikipedia } from '../Interfaces'
import GeonamesAPI from '../GeonamesAPI'
import { useAppStateStore } from '../stores/appState'
import ButtonComponent from './gui/ButtonComponent.vue'
import IconAlertComponent from './icons/IconAlertComponent.vue'
import IconReloadComponent from './icons/IconReloadComponent.vue'

const appState = useAppStateStore()

const props = defineProps<{
  longitude: number
  latitude: number
}>()

const geonames = new GeonamesAPI(appState.geonamesUsername)
const geonamesValidResponse = ref(false)
const countryCode = ref('')
const countryName = ref('')
const oceanName = ref('')
const wikipediaLinks = ref<GeonamesWikipedia[] | null>(null)

onMounted(async () => {
  geonames.setLocation(props.latitude, props.longitude)
  await getGeonamesInformation()
})

const wikipediaCountryLink = computed(() => {
  if (countryName.value) {
    return `https://en.wikipedia.org/wiki/${countryName.value.replace(' ', '_')}`
  }
  return ''
})

const wikipediaOceanLink = computed(() => {
  if (oceanName.value) {
    return `https://en.wikipedia.org/wiki/${oceanName.value.replace(' ', '_')}`
  }
  return ''
})

async function getGeonamesInformation() {
  appState.loading = true
  geonames.setLocation(props.latitude, props.longitude)
  const country: CountryInterface | null = await geonames.getCountry()
  if (country !== null) {
    countryCode.value = country.code
    countryName.value = country.name
    oceanName.value = ''
    geonamesValidResponse.value = true
  } else {
    const ocean = await geonames.getOcean()
    if (ocean !== null) {
      oceanName.value = ocean
      countryCode.value = ''
      countryName.value = ''
      geonamesValidResponse.value = true
    }
  }
  wikipediaLinks.value = await geonames.getWikipediaLinks()
  appState.loading = false
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
        <p class="geonames-panel__location">
          <a :href="wikipediaCountryLink" target="_blank" rel="noopener">{{ countryName }}</a>
        </p>
        <img :src="`https://img.geonames.org/flags/x/${countryCode.toLowerCase()}.gif`" class="geonames-panel__flag" />
      </div>
      <div v-if="oceanName !== ''" class="geonames-panel__location">
        <p><a :href="wikipediaOceanLink" target="_blank" rel="noopener">{{ oceanName }}</a></p>
      </div>
      <div class="geonames-panel__wikipedia-links" v-if="wikipediaLinks">
        <ul>
          <li v-for="(wikipediaLink, index) in wikipediaLinks" :key="index">
            <a :href="`https://${wikipediaLink.wikipediaUrl}`" target="_blank" rel="noopener">{{ wikipediaLink.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="geonames-panel__error">
      <IconAlertComponent />
      <p v-if="appState.geonamesUsername === ''">No geonames username configured</p>
      <p v-if="geonamesValidResponse === false">Could not fetch from geonames</p>
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

.geonames-panel__content {
  font-size: 1rem;
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

.geonames-panel__location {
  margin-bottom: 0.5rem;
}

.geonames-panel__flag {
  height: 3rem;
}

.geonames-panel__wikipedia-links {
  margin-top: 1rem;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
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
</style>
