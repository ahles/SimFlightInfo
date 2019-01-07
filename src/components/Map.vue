<template>
  <div>
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
      position: [],
    };
  },
  mounted() {
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    const marker = L.marker([51.5, -0.09]).addTo(map);

    const socket = io('http://localhost:3000');
    socket.on('position', (position) => {
      this.position = position;
      // console.log('this.position', this.position);
      map.setView([this.position.latitude, this.position.longitude]);
      marker.setLatLng(L.latLng(this.position.latitude, this.position.longitude));
    });
  },
};
</script>

<style scoped lang="scss">

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
  width: 100vw;
  height: 100vh;
  z-index:10;
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
