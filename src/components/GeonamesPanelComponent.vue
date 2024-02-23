<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { CountryInterface, GeonamesWikipedia } from '../Interfaces'
import GeonamesAPI from '../GeonamesAPI'
import { useAppStateStore } from '../stores/appState'
import { useSimStateStore } from '../stores/simState'
import ButtonComponent from './gui/ButtonComponent.vue'
import IconAlertComponent from './icons/IconAlertComponent.vue'
import IconReloadComponent from './icons/IconReloadComponent.vue'

const appState = useAppStateStore()
const simState = useSimStateStore()

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

watch(
  () => appState.wikipediaLinksLanguage,
  () => {
    getGeonamesInformation()
  }
)

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
  wikipediaLinks.value = null
  geonames.setLocation(props.latitude, props.longitude)
  geonames.setLanguage(appState.wikipediaLinksLanguage)
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

function displayPosition(index: number) {
  if (wikipediaLinks.value === null) {
    return
  }
  const item: GeonamesWikipedia = wikipediaLinks.value[index]
  // console.log('item.latitude', item.latitude);
  simState.wikipediaMarker = item
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
        <p>
          <a :href="wikipediaOceanLink" target="_blank" rel="noopener">{{ oceanName }}</a>
        </p>
      </div>
      <Transition name="fade" appear mode="in-out">
        <div v-if="wikipediaLinks" class="geonames-panel__wikipedia-links">
          <ul>
            <li v-for="(wikipediaLink, index) in wikipediaLinks" :key="index">
              <a :href="`https://${wikipediaLink.wikipediaUrl}`" target="_blank" rel="noopener" @mouseenter="displayPosition(index)">{{ wikipediaLink.title }}</a>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
    <div v-else class="geonames-panel__error">
      <IconAlertComponent />
      <ul>
        <p v-if="appState.geonamesUsername === '' || typeof appState.geonamesUsername === 'undefined'">No geonames username configured</p>
        <p v-if="geonamesValidResponse === false">Could not fetch from geonames</p>
      </ul>
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

  a {
    display: block;
    border: none;
    padding: 0.2rem 0;

    &:hover {
      background-color: var(--color-background);
    }
  }

  li:not(:last-of-type) {
    a{
      margin-bottom: 0.2rem;
    }
  }
}

.geonames-panel__error {
  color: var(--color-error);
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;

  svg {
    width: 2rem;
    margin-right: 0.4rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
}
</style>
