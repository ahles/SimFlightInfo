<template>
  <div class="geonames">
    Geonames
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
  mounted() {
    setTimeout(() => {
      this.getCountryName().then((response) => {
        const countryInfo = response;
        console.log('countryInfo', countryInfo);
      });
    }, 1000);
  },
  methods: {
    async getCountryName() {
      await fetch('http://api.geonames.org/countryCode?lat=17.90445&lng=-62.84168&username=fortyparsley')
        .then((response) => {
          console.log('response', response);
        })
        .then((data) => {
          console.log('data', data);
          return data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.geonames {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 300px;
  height: auto;
  background-color: #363636;
  color: white;
  padding: 1rem;
  line-height: 1;
  border-radius: 5px;
  box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);
}
</style>
