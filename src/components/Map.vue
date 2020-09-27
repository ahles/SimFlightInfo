<template>
  <div
    class="map__wrapper"
  >
    <div id="map" />
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
    heading: {
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
      customMarkerInstance: null,
      tileLayer: null,
      mapLayers: {
        layerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        layerOptions: {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      },
    };
  },
  computed: {
    customMarker() {
      return this.$store.getters.getMarker();
    },
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
    customMarker: {
      handler() {
        this.setCustomMarker();
      },
      deep: true,
    },
  },
  mounted() {
    this.initializeMap();
    this.map.on('zoomend', () => {
      this.$store.commit('SET_ZOOM_LEVEL', this.map._zoom); // eslint-disable-line no-underscore-dangle
    });
    this.setCustomMarker();
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
              rotationAngle: this.heading,
            },
          ).addTo(this.map);
          // console.log('this.marker', this.marker);
        } else {
          this.marker.setLatLng(L.latLng(this.latitude, this.longitude));
          this.marker.setRotationAngle(this.heading);
        }
      }
    },
    rotateFixedMarker() {
      const marker = document.getElementsByClassName('position-marker')[0];
      marker.style.transform = `rotate(${this.heading}deg)`;
    },
    setCustomMarker() {
      if (
        this.customMarker.latitude !== null
        && this.customMarker.longitude !== null
        && this.customMarker.name !== ''
      ) {
        if (this.customMarkerInstance) {
          // eslint-disable-next-line max-len
          this.customMarkerInstance.setLatLng(L.latLng(this.customMarker.latitude, this.customMarker.longitude));
        } else {
          this.customMarkerInstance = L.marker(
            [this.customMarker.latitude, this.customMarker.longitude],
          ).addTo(this.map);
        }
      }
    },
  },
};
</script>

<style lang="scss">
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
.leaflet-marker-icon {
  filter: drop-shadow( -2px 3px 2px rgba(0, 0, 0, .7));
}
</style>
