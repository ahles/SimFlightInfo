<template>
  <div
    v-if="initialized"
    class="geonames"
  >
    <div class="geonames__header">
      <h2 class="geonames__title">
        Flying over
      </h2>
      <v-icon
        class="geonames__refresh"
        @click="initGeonames"
      >
        mdi-refresh-circle
      </v-icon>
    </div>

    <p
      v-if="validCountryResponse"
      class="geonames__country"
    >
      Country: {{ countryName }}
    </p>

    <p
      v-if="validOceanResponse"
      class="geonames__ocean"
    >
      Ocean: {{ oceanName }}
    </p>
  </div>
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
    countryCode: null,
    countryName: null,
    countryLanguageCodes: null,
    oceanName: null,
    validOceanResponse: false,
  }),
  mounted() {
    setTimeout(() => {
      this.initGeonames();
    }, 1000);
  },
  methods: {
    async initGeonames() {
      this.initialized = false;
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
        }
      }
      this.initialized = true;
    },
    async getGeonamesCountryCode() {
      const url = `http://api.geonames.org/countryCodeJSON?lat=${this.latitude}&lng=${this.longitude}&username=fortyparsley`;
      const response = await fetch(url);

      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
      return null;
    },
    async getGeonamesOcean() {
      const url = `http://api.geonames.org/oceanJSON?lat=${this.latitude}&lng=${this.longitude}&username=fortyparsley `;
      const response = await fetch(url);

      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.geonames {
  position: absolute;
  top: 40px;
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
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 0;
  }

  &__refresh {
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
}
</style>
