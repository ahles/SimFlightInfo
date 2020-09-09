<template>
  <transition name="fade">
    <div
      v-if="geonamesUser && initialized"
      class="geonames"
    >
      <div class="geonames__header">
        <h2 class="geonames__title">
          Flying over
        </h2>
        <v-icon
          class="geonames__refresh"
          @click="refresh"
        >
          mdi-refresh-circle
        </v-icon>
      </div>

      <p
        v-if="validCountryResponse"
        class="geonames__country"
      >
        <span v-if="wikipediaCountryUrl">
          <a
            :href="wikipediaCountryUrl"
            target="_blank"
            class="link"
          >
            {{ countryName }}
          </a><br>
          <img
            :src="`https://www.countryflags.io/${countryCode}/flat/64.png`"
          >
        </span>
        <span v-else>Country: {{ countryName }}</span>
      </p>

      <p
        v-if="validOceanResponse"
        class="geonames__ocean"
      >
        Ocean: {{ oceanName }}
      </p>

      <div
        v-if="validWikipediaLinksResponse && wikipediaLinks.length > 0"
        class="geonames__wikipedia"
      >
        <h2 class="geonames__title">
          Wikipedia Articles
        </h2>
        <p
          v-for="(item, index) in wikipediaLinks"
          :key="index"
        >
          <a
            class="link"
            :href="`https://${item.wikipediaUrl}`"
            target="_blank"
          >
            {{ item.title }}
          </a>
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Geonames',
  props: {
    latitude: {
      required: true,
      type: Number,
      default: 0,
    },
    longitude: {
      required: true,
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    initialized: false,
    validCountryResponse: false,
    countryCode: 'BL',
    countryName: null,
    countryLanguageCodes: null,
    oceanName: null,
    validOceanResponse: false,
    wikipediaLinks: null,
    validWikipediaLinksResponse: false,
    // osmPOIs: null,
    // validOsmPOIsResponse: false,
  }),
  computed: {
    geonamesUser() {
      if (
        this.$store.state.userSettings.geonamesUser
        && this.$store.state.userSettings.geonamesUser !== ''
      ) {
        return this.$store.state.userSettings.geonamesUser;
      }
      return null;
    },
    isOnZeroZeroPosition() {
      if (
        this.latitude < 0.05
        && this.latitude > -0.05
        && this.longitude < 0.05
        && this.longitude > -0.05
      ) {
        return true;
      }
      return false;
    },
    wikipediaCountryUrl() {
      if (this.countryName) {
        return `https://en.wikipedia.org/wiki/${this.countryName.replace(' ', '_')}`;
      }
      return null;
    },
  },
  mounted() {
    setTimeout(() => {
      this.initGeonames();
    }, 1000);
  },
  methods: {
    refresh() {
      this.initGeonames();
    },
    async initGeonames() {
      this.initialized = false;
      if (
        this.geonamesUser === null
        || this.geonamesUser === ''
      ) {
        this.initialized = true;
        return;
      }
      const geonamesCountryCode = await this.getGeonamesCountryCode();
      if (geonamesCountryCode && typeof (geonamesCountryCode.countryCode) !== 'undefined') {
        this.validOceanResponse = false;
        this.countryCode = geonamesCountryCode.countryCode;
        this.countryName = geonamesCountryCode.countryName;
        this.countryLanguageCodes = geonamesCountryCode.countryLanguageCodes;
        this.validCountryResponse = true;
      } else {
        this.validCountryResponse = false;
        const geonamesOcean = await this.getGeonamesOcean();
        if (geonamesOcean && typeof (geonamesOcean.ocean) !== 'undefined') {
          this.oceanName = geonamesOcean.ocean.name;
          this.validOceanResponse = true;
        } else {
          this.validOceanResponse = false;
        }
      }

      if (!this.isOnZeroZeroPosition) {
        const geonamesWikipediaLinks = await this.getGeonamesWikipediaLinks();
        if (geonamesWikipediaLinks && typeof (geonamesWikipediaLinks.geonames) !== 'undefined') {
          this.wikipediaLinks = geonamesWikipediaLinks.geonames;
          this.validWikipediaLinksResponse = true;
        } else {
          this.validWikipediaLinksResponse = false;
        }
      } else {
        this.wikipediaLinks = [];
      }

      // if (!this.isOnZeroZeroPosition) {
      //   const geonamesOsmPOIs = await this.getGeonamesOsmPOIs();
      //   if (geonamesOsmPOIs && geonamesOsmPOIs.poi.length > 0) {
      //     this.osmPOIs = geonamesOsmPOIs.poi;
      //     this.validOsmPOIsResponse = true;
      //   } else {
      //     this.validOsmPOIsResponse = false;
      //   }
      // } else {
      //   this.osmPOIs = [];
      // }

      this.initialized = true;
    },
    async getGeonamesCountryCode() {
      const url = `http://api.geonames.org/countryCodeJSON?lat=${this.latitude}&lng=${this.longitude}&username=${this.geonamesUser}`;
      const response = await fetch(url);

      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
      return null;
    },
    async getGeonamesOcean() {
      const url = `http://api.geonames.org/oceanJSON?lat=${this.latitude}&lng=${this.longitude}&username=${this.geonamesUser}`;
      const response = await fetch(url);

      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
      return null;
    },
    async getGeonamesWikipediaLinks() {
      const url = `http://api.geonames.org/findNearbyWikipediaJSON?lat=${this.latitude}&lng=${this.longitude}&username=${this.geonamesUser}`;
      const response = await fetch(url);

      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
      return null;
    },
    // async getGeonamesOsmPOIs() {
    //   const url = `http://api.geonames.org/findNearbyPOIsOSMJSON?lat=${this.latitude}&lng=${this.longitude}&username=${this.geonamesUser}`;
    //   const response = await fetch(url);

    //   if (response.status === 200) {
    //     const data = await response.json();
    //     console.log('data', data);
    //     return data;
    //   }
    //   return null;
    // },
  },
};
</script>

<style lang="scss" scoped>
.geonames {
  position: absolute;
  top: 20px;
  left: 20px;
  width: auto;
  height: auto;
  background-color: #363636;
  color: white;
  padding: 1rem;
  line-height: 1;
  border-radius: 5px;
  box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);

  &__header {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-right: 30px;
  }

  &__title {
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: 400;
  }

  p {
    font-size: 0.8rem;
    margin-bottom: 10px;
    font-weight: 300;
  }

  &__refresh {
    position: absolute;
    top: -5px;
    right: -5px;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;

    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }

  &__table {
    border-collapse: collapse;

    td:first-of-type {
      padding-right: 10px;
    }
  }

  &__wikipedia {
    margin-top: 2rem;
  }
}
</style>
