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
      // https://developers.arcgis.com/documentation/core-concepts/security-and-authentication/accessing-arcgis-online-services/
      mapLayers: {
        Map: {
          layerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          layerOptions: { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' },
        },
        Satellite: {
          layerUrl: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          layerOptions: { attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' },
        },
        Topo: {
          layerUrl: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          layerOptions: { attribution: 'Tiles © Esri — Sources: Esri, HERE, Garmin, Intermap, INCREMENT P, GEBCO, USGS, FAO, NPS, NRCan, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, mapwithme, NOSTRA, © OpenStreetMap contributors, and the GIS user community' },
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
        renderer: L.canvas(),
      });

      this.tileLayer = L.tileLayer(
        this.mapLayers[this.view].layerUrl,
        this.mapLayers[this.view].layerOptions,
      ).addTo(this.map);

      this.marker = L.marker(
        [this.latitude, this.longitude],
      ).addTo(this.map);
    },
    positionMarkerAndSetMapView() {
      if (this.mapLockedToPosition) {
        if (this.marker !== null) {
          this.map.removeLayer(this.marker);
          this.marker = null;
        }
        this.map.setView([this.latitude, this.longitude]);
      } else {
        if (this.marker === null) { // eslint-disable-line no-lonely-if
          this.marker = L.marker(
            [this.latitude, this.longitude],
          ).addTo(this.map);
        } else {
          this.marker.setLatLng(L.latLng(this.latitude, this.longitude));
        }
      }

      this.previousLatitude = this.latitude;
      this.previousLongitude = this.longitude;
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
