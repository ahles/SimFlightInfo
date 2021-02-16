<template>
  <v-app-bar
    dark
    dense
    app
    clipped-right
    class="app-bar"
  >
    <v-toolbar-title>
      <v-icon
        dark
        class="app-icon"
      >
        flight
      </v-icon> <span class="app-title">SimFlightInfo</span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      ripple
      small
      class="window-button"
      @click.stop="updateShowGeonamesPanel"
    >
      <v-icon
        v-if="showGeonamesPanel"
        dark
      >
        mdi-lightbulb-outline
      </v-icon>
      <v-icon
        v-else
        dark
      >
        mdi-lightbulb-off-outline
      </v-icon>
    </v-btn>
    <v-btn
      ripple
      small
      class="window-button"
      @click.stop="updateShowInfoPanel"
    >
      <v-icon
        v-if="showInfoPanel"
        dark
      >
        mdi-compass-outline
      </v-icon>
      <v-icon
        v-else
        dark
      >
        mdi-compass-off-outline
      </v-icon>
    </v-btn>
    <v-btn
      ripple
      small
      class="window-button"
      @click.stop="drawer = !drawer"
    >
      <v-icon dark>
        mdi-cog
      </v-icon>
    </v-btn>
    <v-btn
      ripple
      small
      class="window-button"
      @click.stop="minimizeWindow"
    >
      <v-icon
        dark
      >
        minimize
      </v-icon>
    </v-btn>
    <v-btn
      ripple
      small
      class="window-button"
      @click.stop="maximizeWindow"
    >
      <v-icon
        dark
      >
        maximize
      </v-icon>
    </v-btn>
    <v-btn
      ripple
      small
      class="window-button"
      @click.stop="closeWindow"
    >
      <v-icon dark>
        close
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';

const { remote } = require('electron');

export default {
  name: 'Header',
  computed: {
    ...mapState({
      showInfoPanel: (state) => state.userSettings.showInfoPanel,
      showGeonamesPanel: (state) => state.userSettings.showGeonamesPanel,
      showMarkerPanel: (state) => state.userSettings.showMarkerPanel,
    }),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit('SET_DRAWER', value);
      },
    },
  },
  created() {
    this.window = remote.getCurrentWindow();
  },
  methods: {
    updateShowInfoPanel() {
      this.$store.commit('SET_SHOW_INFO_PANEL', !this.showInfoPanel);
    },
    updateShowMarkerPanel() {
      this.$store.commit('SET_SHOW_MARKER_PANEL', !this.showMarkerPanel);
    },
    updateShowGeonamesPanel() {
      this.$store.commit('SET_SHOW_GEONAMES_PANEL', !this.showGeonamesPanel);
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
  },
};
</script>

<style lang="scss">
.window-button {
  -webkit-app-region: no-drag;
  min-width: 0;
  cursor: pointer;
}
.app-icon {
  margin-right: 10px;
}
// .app-title {
//   font-weight: 400;
// }
.app-bar {
  -webkit-app-region: drag;
  cursor: grab;
}
</style>
