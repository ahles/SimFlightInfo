<template>
  <div
    v-if="initialized"
    class="geonames"
  >
    <div class="geonames__header">
      <h2 class="geonames__title">
        Country
      </h2>
      <v-icon
        class="geonames__refresh"
        @click="initGeonames"
      >
        mdi-refresh-circle
      </v-icon>
    </div>

    <table class="geonames__table">
      <tr>
        <td>Name</td>
        <td>{{ countryName }}</td>
      </tr>
      <tr>
        <td>Code</td>
        <td>{{ countryCode }}</td>
      </tr>
      <!--
      <tr>
        <td>Country Language Codes</td>
        <td>{{ countryLanguageCodes }}</td>
      </tr>
      -->
    </table>
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
    validResponse: false,
    countryCode: '',
    countryName: '',
    countryLanguageCodes: '',
  }),
  mounted() {
    this.initGeonames();
  },
  methods: {
    initGeonames() {
      this.initialized = false;
      setTimeout(() => {
        this.getCountryCode().then((response) => {
          console.log('response', response);
          this.initialized = true;
        });
      }, 1000);
    },
    async getCountryCode() {
      const url = `http://api.geonames.org/countryCodeJSON?lat=${this.latitude}&lng=${this.longitude}&username=fortyparsley`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.countryCode = data.countryCode;
          this.countryName = data.countryName;
          this.countryLanguageCodes = data.languages;
          return data;
        });
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
