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
    messageIndex: {
      required: true,
      type: Number,
      default: 0,
    },
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
    bearing: {
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
  },
  data() {
    return {
      map: null,
      marker: null,
      tileLayer: null,
      mapLayers: {
        layerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        layerOptions: {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      },
    };
  },
  watch: {
    messageIndex() {
      this.positionMarkerAndSetMapView();
    },
    zoomLevel() {
      this.map._zoom = this.zoomLevel; // eslint-disable-line no-underscore-dangle
      this.positionMarkerAndSetMapView();
    },
    view() {
      this.map.removeLayer(this.tileLayer);
      this.tileLayer = L.tileLayer(
        this.mapLayers.layerUrl,
        this.mapLayers.layerOptions,
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
        renderer: L.canvas(),
      });

      this.tileLayer = L.tileLayer(
        this.mapLayers.layerUrl,
        this.mapLayers.layerOptions,
      ).addTo(this.map);
    },
    positionMarkerAndSetMapView() {
      if (this.mapLockedToPosition) {
        if (this.marker !== null) {
          this.map.removeLayer(this.marker);
          this.marker = null;
        }
        this.rotateFixedMarker();
        this.map.setView([this.latitude, this.longitude]);
      } else {
        if (this.marker === null) { // eslint-disable-line no-lonely-if
          this.marker = L.marker(
            [this.latitude, this.longitude],
            {
              rotationAngle: this.bearing,
            },
          ).addTo(this.map);
          // console.log('this.marker', this.marker);
        } else {
          this.marker.setLatLng(L.latLng(this.latitude, this.longitude));
          this.marker.setRotationAngle(this.bearing);
        }
      }
    },
    rotateFixedMarker() {
      const marker = document.getElementsByClassName('position-marker')[0];
      marker.style.transform = `rotate(${this.bearing}deg)`;
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
