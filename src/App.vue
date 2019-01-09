<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" right app dark>
      <v-list three-line>
        <v-list-tile>
          <v-icon large>flight</v-icon>
          <span class="section-header">Position</span>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Latitude</v-list-tile-title>
            <v-list-tile-sub-title>{{ latitude.toFixed(6) }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Longitude</v-list-tile-title>
            <v-list-tile-sub-title>{{ longitude.toFixed(6) }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Altitude above Sea</v-list-tile-title>
            <v-list-tile-sub-title>{{ Math.floor(altitudeSea) }} ft<br />{{ Math.floor(altitudeSea) }} m</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Altitude above Ground</v-list-tile-title>
            <v-list-tile-sub-title>{{ Math.floor(altitudeGround) }} ft<br />{{ Math.floor(altitudeGround) }} m</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="onRunway">
          <v-icon dark>flight_land</v-icon>&nbsp;On runway
        </v-list-tile>
      </v-list>
      <v-spacer />
      <v-btn absolute bottom right small ripple @click.stop="reload" class="window-button reload">
        <v-icon dark>cached</v-icon>
      </v-btn>
    </v-navigation-drawer>
    <v-toolbar dark dense app>
      <v-toolbar-title>xpvuemap</v-toolbar-title>
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
    <v-content v-bind:class="{ overlay__blur: !receivingData }">
      <Map />
    </v-content>
    <v-btn v-if="!drawer" dark small absolute bottom right fab ripple @click.stop="drawer = !drawer" class="menu">
      <v-icon dark>menu</v-icon>
    </v-btn>
    <div class="overlay" v-if="!receivingData">
      <div class="overlay__content">
        <v-icon class="overlay__icon">airplanemode_inactive</v-icon>
        <h1 class="display-2">Not receiving data</h1>
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
import { mapGetters } from 'vuex';
import Map from '@/components/Map.vue';

const remote = require("electron").remote; /* eslint-disable-line */

export default {
  name: 'App',
  components: {
    Map,
  },
  data: () => ({
    drawer: false,
    window: null,
  }),
  computed: {
    ...mapGetters({
      receivingData: 'getReceivingData',
      latitude: 'getLatitude',
      longitude: 'getLongitude',
      altitudeSea: 'getAltitudeSea',
      altitudeGround: 'getAltitudeGround',
      onRunway: 'getOnRunway',
    }),
    altitudeM() {
      return this.altitude * 0.3048;
    },
  },
  beforeCreate() {
    this.$store.dispatch('receiveData');
  },
  created() {
    this.window = remote.getCurrentWindow();
  },
  methods: {
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
    reload() {
      window.location.reload();
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
// .v-list--two-line .v-list__tile {
//   height: auto;
// }
.v-list__tile__title,
.v-list__tile__sub-title {
  display: flex;
  justify-content: flex-end;
  text-align: right;
}
.v-btn--bottom.v-btn--absolute.v-btn--small.menu {
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
</style>
