<template>
  <div class="map__wrapper">
    <!--
    <table>
      <thead>
        <tr>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Altitude</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ position.latitude }}</td>
          <td>{{ position.longitude }}</td>
          <td>{{ position.altitude }}</td>
        </tr>
      </tbody>
    </table>
    -->
    <div v-if="altitude" class="altitude">Altitude: {{ Math.floor(altitude) }} ft</div>
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import { mapGetters } from 'vuex';

export default {
  name: 'Map',
  data: function () { /* eslint-disable-line */
    return {
      map: null,
      marker: null,
      previousLatitude: 0,
      previousLongitude: 0,
    };
  },
  computed: {
    ...mapGetters({
      latitude: 'getLatitude',
      longitude: 'getLongitude',
      altitude: 'getAltitude',
    }),
  },
  watch: {
    latitude() {
      this.positionMarkerAndSetMapView();
    },
  },
  // beforeCreate() {
  //   this.$store.dispatch('receiveData');
  // },
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      this.map = L.map('map').setView([this.latitude, this.longitude], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      this.marker = L.marker(
        [this.latitude, this.longitude],
        {
          // rotationAngle: 45,
        },
      ).addTo(this.map);
    },
    positionMarkerAndSetMapView() {
      this.map.setView([this.latitude, this.longitude]);

      this.marker.setLatLng(L.latLng(this.latitude, this.longitude));
      // this.marker.setRotationAngle(this.calculateAngle());

      this.previousLatitude = this.latitude;
      this.previousLongitude = this.longitude;
    },
    calculateAngle() {
      // https://stackoverflow.com/questions/3932502/calculate-angle-between-two-latitude-longitude-points
      const distanceLongitude = (this.longitude - this.previousLongitude);

      const y = Math.sin(distanceLongitude) * Math.cos(this.latitude);
      const x = Math.cos(this.previousLatitude) * Math.sin(this.latitude) - Math.sin(this.previousLatitude) * Math.cos(this.latitude) * Math.cos(distanceLongitude);

      let angle = Math.atan2(y, x);

      angle = angle * (180 / Math.PI); /* eslint-disable-line */
      angle = (angle + 360) % 360;
      angle = 360 - angle;

      // console.log('angle', angle);
      return angle;
    },
  },
};
</script>

<style lang="scss" scoped>

table {
  margin: 0 auto;
  border-collapse: collapse;
  border: 1px solid black;

  td,
  th {
    border: 1px solid black;
    padding: 10px;
  }
}
#map {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: calc(100vh - 48px);
  z-index: 0;
}
.altitude {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
  background: rgba(255,255,255,0.75);
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
}
</style>
