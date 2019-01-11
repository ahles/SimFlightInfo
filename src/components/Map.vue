<template>
  <div class="map__wrapper">
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet';

export default {
  name: 'Map',
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
    zoomLevel: {
      required: true,
      type: Number,
      default: 10,
    },
    mapLockedToPosition: {
      required: true,
      type: Boolean,
      default: true,
    },
    view: {
      required: true,
      type: String,
      default: 'map',
    },
  },
  data() {
    return {
      map: null,
      marker: null,
      previousLatitude: 0,
      previousLongitude: 0,
      tileLayer: null,
      mapLayers: {
        Map: {
          layerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          layerOptions: { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' },
        },
        Satellite: {
          layerUrl: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          layerOptions: { attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' },
        },
      },
    };
  },
  watch: {
    latitude() {
      this.positionMarkerAndSetMapView();
    },
    zoomLevel() {
      this.map._zoom = this.zoomLevel; // eslint-disable-line no-underscore-dangle
    },
    view() {
      this.map.removeLayer(this.tileLayer);
      this.tileLayer = L.tileLayer(
        this.mapLayers[this.view].layerUrl,
        this.mapLayers[this.view].layerOptions,
      ).addTo(this.map);
    },
  },
  mounted() {
    this.initializeMap();
    this.map.on('zoomend', () => {
      this.$store.commit('UPDATE_ZOOM_LEVEL', this.map._zoom); // eslint-disable-line no-underscore-dangle
    });
  },
  methods: {
    initializeMap() {
      this.map = L.map('map', {
        center: [this.latitude, this.longitude],
        zoom: this.zoomLevel,
        zoomControl: false,
        // renderer: L.canvas(),
      });

      this.tileLayer = L.tileLayer(
        this.mapLayers[this.view].layerUrl,
        this.mapLayers[this.view].layerOptions,
      ).addTo(this.map);

      this.marker = L.marker(
        [this.latitude, this.longitude],
        {
          // rotationAngle: 45,
        },
      ).addTo(this.map);
    },
    positionMarkerAndSetMapView() {
      if (this.mapLockedToPosition) {
        this.map.setView([this.latitude, this.longitude]);
      }

      this.marker.setLatLng(L.latLng(this.latitude, this.longitude));
      // this.marker.setRotationAngle(this.calculateAngle());

      this.previousLatitude = this.latitude;
      this.previousLongitude = this.longitude;
    },
    calculateAngle() {
      // not exact, needs improvement. something wrong?
      // https://stackoverflow.com/questions/3932502/calculate-angle-between-two-latitude-longitude-points
      const distanceLongitude = (this.longitude - this.previousLongitude);

      const y = Math.sin(distanceLongitude) * Math.cos(this.latitude);
      const x = Math.cos(this.previousLatitude) * Math.sin(this.latitude) - Math.sin(this.previousLatitude) * Math.cos(this.latitude) * Math.cos(distanceLongitude);

      let angle = Math.atan2(y, x);

      angle *= (180 / Math.PI);
      angle = (angle + 360) % 360;
      angle = 360 - angle;

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
