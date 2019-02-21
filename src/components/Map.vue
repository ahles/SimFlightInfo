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
  },
  data() {
    return {
      map: null,
      marker: null,
      angle: 0,
      previousLatitude: 0,
      previousLongitude: 0,
      tileLayer: null,
      mapLayers: {
        layerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        layerOptions: { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' },
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

      this.marker = L.marker(
        [this.latitude, this.longitude],
        {
          rotationAngle: this.angle,
        },
      ).addTo(this.map);
    },
    positionMarkerAndSetMapView() {
      this.calculateAngle();
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
              rotationAngle: this.angle,
            },
          ).addTo(this.map);
        } else {
          this.marker.setLatLng(L.latLng(this.latitude, this.longitude));
          this.marker.setRotationAngle(this.angle);
        }
      }

      this.previousLatitude = this.latitude;
      this.previousLongitude = this.longitude;
    },
    calculateAngle() {
      // https://stackoverflow.com/questions/3932502/calculate-angle-between-two-latitude-longitude-points
      const p1 = {
        x: this.previousLatitude,
        y: this.previousLongitude,
      };
      const p2 = {
        x: this.latitude,
        y: this.longitude,
      };
      this.angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    },
    rotateFixedMarker() {
      const marker = document.getElementsByClassName('position-marker')[0];
      marker.style.transform = `rotate(${this.angle}deg)`;
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
