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
      planeMarkerIcon: null,
      customMarkerIcon: null,
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
    customMarkerSet() {
      return this.$store.state.customMarkerSet;
    },
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
    customMarkerSet(newValue) {
      if (newValue) {
        this.addCustomMarker();
      } else {
        this.removeCustomMarker();
      }
    },
  },
  mounted() {
    this.initializeMap();
    this.map.on('zoomend', () => {
      this.$store.commit('SET_ZOOM_LEVEL', this.map._zoom); // eslint-disable-line no-underscore-dangle
    });
    if (this.customMarkerSet) {
      this.addCustomMarker();
    }
  },
  methods: {
    initializeMap() {
      this.map = L.map('map', {
        center: [this.latitude, this.longitude],
        zoom: this.zoomLevel,
        zoomControl: false,
        renderer: L.canvas(),
      });

      this.planeMarkerIcon = L.icon({
        iconUrl: require('@/assets/images/plane.svg'), // eslint-disable-line
        iconSize: [40, 40],
        iconAnchor: [20, 35],
      });

      this.customMarkerIcon = L.icon({
        iconUrl: require('@/assets/images/map-marker.svg'), // eslint-disable-line
        iconSize: [40, 40],
        iconAnchor: [20, 35],
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
              icon: this.planeMarkerIcon,
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
    addCustomMarker() {
      // console.log('%c addCustomMarker ', 'background-color: #bada55; color: black;');
      // console.log('this.customMarker', this.customMarker);
      this.customMarkerInstance = L.marker(
        [this.customMarker.latitude, this.customMarker.longitude],
        {
          icon: this.customMarkerIcon,
        },
      ).addTo(this.map);
      // console.log('this.customMarkerInstance', this.customMarkerInstance);
    },
    removeCustomMarker() {
      // console.log('%c removeCustomMarker ', 'background-color: #bada55; color: black;');
      this.customMarkerInstance.remove();
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
