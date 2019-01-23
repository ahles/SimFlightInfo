<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" right app dark>
      <v-list class="flight">
        <v-list-tile>
          <v-icon large>flight</v-icon>
          <span class="section-header">Position</span>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Latitude</v-list-tile-title>
            <v-list-tile-sub-title>{{ data.latitude.toFixed(6) }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Longitude</v-list-tile-title>
            <v-list-tile-sub-title>{{ data.longitude.toFixed(6) }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Altitude above Sea</v-list-tile-title>
            <v-list-tile-sub-title>{{ roundAltitude(data.altitudeSea) }} ft<br />{{ roundAltitude(convertFeetToMeter(data.altitudeSea)) }} m</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Altitude above Ground</v-list-tile-title>
            <v-list-tile-sub-title>{{ roundAltitude(data.altitudeGround) }} ft<br />{{ roundAltitude(convertFeetToMeter(data.altitudeGround)) }} m</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="data.onRunway">
          <v-icon dark>flight_land</v-icon>&nbsp;On runway
        </v-list-tile>
      </v-list>
      <v-list three-line>
        <v-list-tile>
          <v-icon large>map</v-icon>
          <span class="section-header">Settings</span>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="view">
          <v-list-tile-content>
            <v-select
              :items="viewOptions"
              label="View"
              :value="data.view"
              @change="updateView"
              outline
              color="rgba(255, 255, 255, 0.75)"
          ></v-select>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-switch
              label="Move map"
              :input-value="data.mapLockedToPosition"
              @change="updateMapLockedToPosition"
              color="rgba(255, 255, 255, 0.75)"
            ></v-switch>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="zoom-level">
          <v-list-tile-title>Zoom level {{ data.zoomLevel }}</v-list-tile-title>
          <v-list-tile-content>
            <v-slider
              :value="data.zoomLevel"
              min="0"
              max="18"
              step="1"
              ticks="always"
              @change="updateZoomLevel"
              light
              color="rgba(255, 255, 255, 0.75)"
            ></v-slider>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark dense app clipped-right>
      <v-toolbar-title><v-icon dark class="app-icon">flight</v-icon> xpvuemap</v-toolbar-title>
      <v-spacer/>
      <v-btn ripple small @click.stop="minimizeWindow" class="window-button">
        <v-icon dark>minimize</v-icon>
      </v-btn>
      <v-btn ripple small @click.stop="maximizeWindow" class="window-button">
        <v-icon dark>maximize</v-icon>
      </v-btn>
      <v-btn ripple small @click.stop="closeWindow" class="window-button">
        <v-icon dark>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content v-bind:class="{ overlay__blur: !data.receivingData }">
      <div class="position-marker" v-if="data.mapLockedToPosition"></div>
      <Map :latitude="data.latitude" :longitude="data.longitude" :zoomLevel="data.zoomLevel" :mapLockedToPosition="data.mapLockedToPosition" :view="data.view" />
      <div>
        <v-alert
          v-model="simulating"
          type="warning"
          class="simulating"
          icon="cast"
        >
          <strong>Simulating</strong>
          <v-spacer />
          <v-btn title="stop" color="warning" ripple outline small @click.stop="stopSimulation" class="simulating__stop">
            <v-icon dark>cancel</v-icon>
          </v-btn>
        </v-alert>
      </div>
    </v-content>
    <v-btn v-if="!drawer" dark small absolute bottom right fab ripple @click.stop="drawer = !drawer" class="menu">
      <v-icon dark>flight</v-icon>
    </v-btn>
    <v-btn v-else dark small absolute bottom right fab ripple @click.stop="drawer = !drawer" class="close">
      <v-icon dark>arrow_forward_ios</v-icon>
    </v-btn>
    <div class="overlay" v-if="!data.receivingData">
      <div class="overlay__content">
        <v-icon class="overlay__icon">airplanemode_inactive</v-icon>
        <h1 class="display-2">Not receiving data</h1>
        <v-btn dark ripple @click.stop="simulate" class="simulate">
          <v-icon dark>flight</v-icon> Simulate
        </v-btn>
      </div>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="overlay__blur-svg">
        <defs>
          <filter id="blur-filter">
            <feGaussianBlur stdDeviation="3"></feGaussianBlur>
          </filter>
        </defs>
      </svg>
    </div>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Map from '@/components/Map.vue';

const { remote } = require('electron');

export default {
  name: 'App',
  components: {
    Map,
  },
  data: () => ({
    drawer: false,
    window: null,
    simulating: false,
    viewOptions: [
      'Map',
      'Satellite',
      'Topo',
    ],
  }),
  computed: {
    ...mapState({
      data: state => state.data,
    }),
  },
  beforeCreate() {
    this.$store.dispatch('receiveData');
  },
  created() {
    this.window = remote.getCurrentWindow();
  },
  methods: {
    simulate() {
      this.$store.commit('UPDATE_SIMULATION_ACTIVE', true);
      this.$store.dispatch('simulateData');
      this.simulating = true;
    },
    stopSimulation() {
      this.window.reload();
    },
    convertFeetToMeter(ft) {
      return ft * 0.3048;
    },
    updateMapLockedToPosition(event) {
      this.$store.commit('UPDATE_MAP_LOCKED_TO_POSITION', event);
    },
    updateZoomLevel(event) {
      this.$store.commit('UPDATE_ZOOM_LEVEL', event);
    },
    updateView(event) {
      this.$store.commit('UPDATE_VIEW', event);
    },
    closeWindow() {
      this.window.close();
    },
    minimizeWindow() {
      this.window.minimize();
    },
    maximizeWindow() {
      if (!this.window.isMaximized()) {
        this.window.maximize();
      } else {
        this.window.unmaximize();
      }
    },
    roundAltitude(altitude) {
      return Math.floor(altitude);
    },
  },
};
</script>

<style lang="scss">
body,
html {
  overflow: hidden;
}
.section-header {
  padding-left: 18px;
}

.v-list.flight {
  padding-top: 40px;

  .v-list__tile {
    height: auto;
    margin-bottom: 30px;
  }

  .v-divider {
    margin-bottom: 20px;
  }

  .v-list__tile .v-list__tile__content {
    flex-direction: row;
    // justify-content: space-between;
  }
  .v-list__tile__title,
  .v-list__tile__sub-title {
    width: 70%;
    display: flex;
    justify-content: flex-start;
  }
  .v-list__tile__sub-title {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    text-align: right;
  }
}
.v-btn--bottom.v-btn--absolute.v-btn--small.menu,
.v-btn--bottom.v-btn--absolute.v-btn--small.close {
  bottom: 30px;
  right: 20px;
  z-index: 100;
  .v-icon {
    width: 18px;
  }
}
.v-btn--bottom.v-btn--absolute.v-btn--small.reload {
  bottom: 20px;
  left: 20px;
  z-index: 100;
}
.v-toolbar {
  -webkit-app-region: drag;
  z-index: 7;
}
.v-navigation-drawer {
  padding-top: 40px;
}

.window-button {
  -webkit-app-region: no-drag;
  min-width: 0;
}

.overlay {
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: calc(100vh - 48px);
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: grey;
  }

  &__icon {
    font-size: 200px;
    color: grey;
  }

  &__blur {
    width: 100%;
    height: 100%;
    filter: blur(3px);
  }

  &__blur-svg {
      display: none;
  }
}

.zoom-level {
  .v-list__tile {
    flex-direction: column;
  }
  .v-list__tile__content {
    width: 100%;
  }
  .v-list__tile__title {
    justify-content: flex-start;
    text-align: left;
  }
  .v-input--slider {
    width: 100%;
  }
}

.view {
  margin-top: 30px;
  .theme--dark.v-text-field--outline>.v-input__control>.v-input__slot,
  .theme--dark.v-text-field--outline:not(.v-input--is-focused):not(.v-input--has-state)>.v-input__control>.v-input__slot:hover {
    border: 1px solid;
  }
}

.simulate {
  margin-top: 30px;
  .v-icon {
    margin-right: 10px;
  }
}
.simulating {
  margin-top: 0;
  padding: 8px 16px;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .v-icon {
    color: white !important;
  }
  &__stop {
    min-width: 40px;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
}

.position-marker {
  width: 25px;
  height: 41px;
  position: absolute;
  background-image: url('./assets/images/marker.png');
  position: absolute;
  top: calc(50% + 9px);
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 4;
}
.leaflet-container .leaflet-marker-pane img {
  margin-top: -14px !important;
}

.app-icon {
  margin-right: 10px;
}
</style>
