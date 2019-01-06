<template>
  <div>
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
  <div class="map"></div>
  </div>
</template>

<script>
import io from 'socket.io-client';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import { fromLonLat } from 'ol/proj';

export default {
  name: 'Map',
  data: function () { /* eslint-disable-line */
    return {
      position: [],
    };
  },
  created() {
    // var map = new Map({
    //   target: 'map',
    //   layers: [
    //     new TileLayer({
    //       source: new OSM()
    //     })
    //   ],
    //   view: new View({
    //     center: fromLonLat([37.41, 8.82]),
    //     // center: [0, 0],
    //     zoom: 4
    //   })
    // });

    const socket = io('http://localhost:3000');

    socket.on('position', (position) => {
      this.position = position;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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


</style>
