<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" right app dark>
      <v-list two-line>
        <v-list-tile avatar>
          <v-icon large>flight</v-icon>
          <span class="section-header">Position</span>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>Latitude</v-list-tile-title>
            <v-list-tile-sub-title>{{ latitude }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>Longitude</v-list-tile-title>
            <v-list-tile-sub-title>{{ longitude }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>Altitude</v-list-tile-title>
            <v-list-tile-sub-title>{{ Math.floor(altitude) }} ft / {{ Math.floor(altitudeM) }} m</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
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
    <v-content>
      <router-view/>
    </v-content>
    <v-btn dark small absolute bottom left fab ripple @click.stop="reload" class="reload">
      <v-icon dark>cached</v-icon>
    </v-btn>
    <v-btn dark small absolute bottom right fab ripple @click.stop="drawer = !drawer" class="flight-info">
      <v-icon dark>flight</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

const remote = require("electron").remote; /* eslint-disable-line */

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    window: null,
  }),
  computed: {
    ...mapGetters({
      latitude: 'getLatitude',
      longitude: 'getLongitude',
      altitude: 'getAltitude',
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
.v-btn--bottom.v-btn--absolute.v-btn--small.flight-info {
  bottom: 20px;
  right: 20px;
}
.v-btn--bottom.v-btn--absolute.v-btn--small.reload {
  bottom: 20px;
  left: 20px;
}
.v-toolbar {
  -webkit-app-region: drag;
}
.window-button {
  -webkit-app-region: no-drag;
  min-width: 0;
}
</style>
