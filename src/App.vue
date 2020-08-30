<template>
  <v-app>
    <v-app-bar dark dense app clipped-right>
      <v-toolbar-title><v-icon dark class="app-icon">flight</v-icon> Whereismyplane</v-toolbar-title>
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
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app right dark absolute>
      <v-list class="flight">
        <v-list-item>
          <v-icon large>flight</v-icon>
          <span class="section-header">{{ $t('Position') }}</span>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ $t('Latitude') }}</v-list-item-title>
            <v-list-item-subtitle>{{ data.latitude.toFixed(6) }}°</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ $t('Longitude') }}</v-list-item-title>
            <v-list-item-subtitle>{{ data.longitude.toFixed(6) }}°</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ $t('Altitude above sea') }}</v-list-item-title>
            <v-list-item-subtitle>{{ convertMToFeet(roundAltitude(data.altitudeSea)).toFixed(0) }} feet<br />{{ roundAltitude(data.altitudeSea) }} m</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ $t('Bearing') }}</v-list-item-title>
            <v-list-item-subtitle>{{ data.bearing.toFixed(1) }}°</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ $t('Ground Speed') }}</v-list-item-title>
            <v-list-item-subtitle>{{ convertMSToKnots(data.groundSpeed).toFixed(0) }} kts<br />{{ convertMSToKmh(data.groundSpeed).toFixed(0) }} km/h</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list three-line class="settings">
        <v-list-item>
          <v-icon large>map</v-icon>
          <span class="section-header">{{ $t('Settings') }}</span>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-switch
              :label="$t('Move map')"
              :input-value="data.mapLockedToPosition"
              @change="updateMapLockedToPosition"
              color="rgba(255, 255, 255, 0.75)"
            ></v-switch>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="zoom-level">
          <v-list-item-title>{{ $t('Zoom level') }}</v-list-item-title>
          <v-list-item-content>
            <v-slider
              :value="data.zoomLevel"
              min="0"
              max="18"
              step="1"
              ticks="always"
              @change="updateZoomLevel"
              light
              color="rgba(255, 255, 255, 0.75)"
              track-color="rgba(255, 255, 255, 0.75)"
              thumb-label="always"
              :thumb-size="24"
            ></v-slider>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="language">
          <v-list-item-title>{{ $t('Language') }}</v-list-item-title>
          <v-list-item-content>
            <v-select
              v-model="$i18n.locale"
              dense
              outlined
              :items="langs"
              @change="changeLangInLocalstorage()"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main v-bind:class="{ overlay__blur: !data.receivingData }">
      <div class="position-marker" v-if="data.mapLockedToPosition">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <path d="M38.186 27.21v-3.596L22.95 14.622v-9.89c0-1.493-1.276-2.698-2.857-2.698-1.58 0-2.857 1.205-2.857 2.697v9.891L2 23.614v3.596l15.236-4.496v9.891l-3.809 2.698V38l6.666-1.798L26.76 38v-2.697l-3.809-2.698v-9.89z" />
        </svg>
      </div>
      <Map
        :messageIndex="data.messageIndex"
        :latitude="data.latitude"
        :longitude="data.longitude"
        :bearing="data.bearing"
        :zoomLevel="data.zoomLevel"
        :mapLockedToPosition="data.mapLockedToPosition"
      />
      <div>
        <v-alert
          v-model="simulating"
          type="warning"
          class="simulating"
          icon="cast"
        >
          <strong>{{ $t('Simulating') }}</strong>
          <v-spacer />
          <v-btn title="stop" color="warning" ripple outlined small @click.stop="stopSimulation" class="simulating__stop">
            <v-icon dark>cancel</v-icon>
          </v-btn>
        </v-alert>
      </div>
    </v-main>
    <v-btn v-if="!drawer" dark small absolute bottom right fab ripple @click.stop="drawer = !drawer" class="menu">
      <v-icon dark>flight</v-icon>
    </v-btn>
    <v-btn v-else dark small absolute bottom right fab ripple @click.stop="drawer = !drawer" class="close">
      <v-icon dark>arrow_forward_ios</v-icon>
    </v-btn>
    <div class="overlay" v-if="!data.receivingData">
      <div class="overlay__content">
        <v-icon class="overlay__icon">airplanemode_inactive</v-icon>
        <h1 class="display-2">{{ $t('Not receiving data') }}</h1>
        <v-btn dark ripple @click.stop="simulate" class="simulate">
          <v-icon dark>flight</v-icon> {{ $t('Simulate') }}
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
    langs: [
      {
        text: 'EN',
        value: 'en',
      },
      {
        text: 'DE',
        value: 'de',
      },
      {
        text: 'ES',
        value: 'es',
      },
    ],
  }),
  computed: {
    ...mapState({
      data: (state) => state.data,
      locale: (state) => state.locale,
    }),
    bearing() {
      return this.data.mag - this.data.magVar;
    },
  },
  beforeCreate() {
    this.$store.dispatch('receiveData');
  },
  created() {
    this.window = remote.getCurrentWindow();
    this.$i18n.locale = this.locale;
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
    convertMSToKnots(ms) {
      return ms * 1.943844;
    },
    convertMSToKmh(ms) {
      return ms * 3.6;
    },
    convertMToFeet(m) {
      return m * 3.28084;
    },
    updateMapLockedToPosition(event) {
      this.$store.commit('UPDATE_MAP_LOCKED_TO_POSITION', event);
    },
    updateZoomLevel(event) {
      this.$store.commit('UPDATE_ZOOM_LEVEL', event);
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
    changeLangInLocalstorage() {
      this.$store.commit('SET_LOCALE', this.$i18n.locale);
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

  .v-list-item {
    height: auto;
  }

  .v-divider {
    margin-bottom: 20px;
  }

  .v-list-item .v-list-item__content {
    flex-direction: row;
  }
}

.v-navigation-drawer__content {
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.v-btn--fab.v-size--small.v-btn--absolute.v-btn--bottom.menu,
.v-btn--fab.v-size--small.v-btn--absolute.v-btn--bottom.close {
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
    font-size: 150px !important;
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
  min-height: 0 !important;

  &.v-list-item {
    flex-direction: column;
  }
  .v-list-item__content {
    padding-top: 40px;
    width: 100%;
  }
  .v-list-item__title {
    justify-content: flex-start;
    text-align: left;
    align-self: flex-start;
  }
  .v-input--slider {
    width: 100%;
  }
  .v-slider__thumb-label {
    color: #000;
  }
}

.language {
  &.v-list-item {
    flex-direction: column;
    min-height: 0;
  }
  .v-list-item__title {
    justify-content: flex-start;
    text-align: left;
    align-self: flex-start;
  }

  .v-list-item__content {
    width: 80px;
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
  width: 40px;
  height: 40px;
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  z-index: 4;
  filter: drop-shadow( -2px 3px 2px rgba(0, 0, 0, .7));

  &.satellite {
    svg {
      fill: #fb8c00;
    }
  }
}

.leaflet-container .leaflet-marker-pane img {
  filter: drop-shadow( -2px 3px 2px rgba(0, 0, 0, .7));
    svg {
      fill: #fb8c00;
    }
}

.app-icon {
  margin-right: 10px;
}

.onground {
  i {
    padding-right: 10px;
  }
}
</style>
