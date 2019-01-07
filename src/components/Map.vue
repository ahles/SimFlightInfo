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
    <div class="altitude">Altitude: {{ Math.floor(position.altitude) }} ft</div>
    <div id="map"></div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import L from 'leaflet';

export default {
  name: 'Map',
  data: function () { /* eslint-disable-line */
    return {
      position: {},
      map: null,
      marker: null,
      socket: null,
    };
  },
  mounted() {
    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.marker = L.marker([51.5, -0.09]).addTo(this.map);

    this.socket = io('http://localhost:3000');
    this.socket.on('position', (position) => {
      this.position = position;
      this.map.setView([this.position.latitude, this.position.longitude]);
      this.marker.setLatLng(L.latLng(this.position.latitude, this.position.longitude));
    });
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
  width: 100vw;
  height: calc(100vh - 48px);
  z-index: 0;
}
.altitude {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 20;
  background: rgba(255,255,255,0.75);
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
}
</style>
