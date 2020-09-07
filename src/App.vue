<template>
  <v-app>
    <Header />
    <v-navigation-drawer
      v-model="drawer"
      right
      dark
      absolute
      disable-resize-watcher
    >
      <Settings />
    </v-navigation-drawer>

    <v-main
      :class="{ overlay__blur: !receivingData }"
    >
      <transition name="fade">
        <PositionMarker
          v-if="mapLockedToPosition && messageIndex > 0"
        />
      </transition>

      <transition name="fade">
        <Map
          v-if="messageIndex > 0"
          :message-index="messageIndex"
          :latitude="latitude"
          :longitude="longitude"
          :heading="heading"
          :zoom-level="zoomLevel"
          :map-locked-to-position="mapLockedToPosition"
        />
      </transition>

      <transition name="fade">
        <InfoPanel
          v-if="messageIndex > 0"
          :latitude="latitude"
          :longitude="longitude"
          :heading="heading"
          :altitude-sea="altitudeSea"
          :ground-speed="groundSpeed"
          :pitch="pitch"
          :roll="roll"
        />
      </transition>

      <SimulationBar
        :simulating="simulationActive"
      />

      <Geonames
        v-if="receivingData"
        :latitude="latitude"
        :longitude="longitude"
      />
    </v-main>

    <Overlay
      v-if="!receivingData"
      @simulate="simulateData"
    />
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header.vue';
import Map from '@/components/Map.vue';
import Settings from '@/components/Settings.vue';
import SimulationBar from '@/components/SimulationBar.vue';
import Overlay from '@/components/Overlay.vue';
import PositionMarker from '@/components/PositionMarker.vue';
import InfoPanel from '@/components/InfoPanel.vue';
import Geonames from '@/components/Geonames.vue';

const { ipcRenderer } = require('electron');

export default {
  name: 'App',
  components: {
    Header,
    Map,
    Settings,
    SimulationBar,
    Overlay,
    PositionMarker,
    InfoPanel,
    Geonames,
  },
  data: () => ({
    messageIndex: 0,
    latitude: 0,
    longitude: 0,
    altitudeSea: 0, // m
    groundSpeed: 0, // m/s
    heading: 0,
    pitch: 0,
    roll: 0,
  }),
  computed: {
    ...mapState({
      locale: (state) => state.userSettings.locale,
      simulationActive: (state) => state.simulationActive,
      receivingData: (state) => state.receivingData,
      mapLockedToPosition: (state) => state.userSettings.mapLockedToPosition,
      zoomLevel: (state) => state.userSettings.zoomLevel,
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
  watch: {
    locale() {
      this.$i18n.locale = this.locale;
    },
  },
  created() {
    this.$store.dispatch('getJsonSettings');
    this.receiveData();
    this.$i18n.locale = this.locale;
  },
  methods: {
    receiveData() {
      ipcRenderer.on('position', (event, position) => {
        if (!this.receivingData) {
          this.$store.commit('UPDATE_RECEIVING_DATA', true);
        }
        if (position.messageIndex !== this.messageIndex) {
          this.messageIndex = position.messageIndex;
        }
        if (position.latitude !== this.latitude) {
          this.latitude = position.latitude;
        }
        if (position.longitude !== this.longitude) {
          this.longitude = position.longitude;
        }
        if (position.altitudeSea !== this.altitudeSea) {
          this.altitudeSea = position.altitudeSea;
        }
        if (position.groundSpeed !== this.groundSpeed) {
          this.groundSpeed = position.groundSpeed;
        }
        if (position.heading !== this.heading) {
          this.heading = position.heading;
        }
        if (position.pitch !== this.pitch) {
          this.pitch = position.pitch;
        }
        if (position.roll !== this.roll) {
          this.roll = position.roll;
        }
      });
    },
    simulateData() {
      this.$store.commit('UPDATE_SIMULATION_ACTIVE', true);
      const positions = require('./assets/example-flight.json'); // eslint-disable-line
      if (!this.receivingData) {
        this.$store.commit('UPDATE_RECEIVING_DATA', true);
      }
      this.$store.commit('UPDATE_ZOOM_LEVEL', 14);
      /* eslint-disable no-loop-func */
      for (let i = 0; i < positions.length; i += 1) {
        ((x, pos) => {
          if (typeof positions[i] !== 'undefined') {
            setTimeout(() => {
              if (this.simulationActive && typeof pos[x] !== 'undefined') {
                this.latitude = pos[x].latitude;
                this.longitude = pos[x].longitude;
                this.altitudeSea = pos[x].altitudeSea;
                this.groundSpeed = pos[x].groundSpeed;
                this.heading = pos[x].heading;
                this.pitch = pos[x].pitch;
                this.roll = pos[x].roll;
                this.messageIndex = i;
              }
            }, x * 1000, positions);
          }
        })(i, positions);
      }
      /* eslint-enable no-loop-func */
    },
  },
};
</script>

<style lang="scss">
body,
html {
  overflow: hidden;
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

  .v-list-item__title {
    font-weight: 300;
    color: rgba(255, 255, 255, 0.7);
  }

  .v-list-item__subtitle {
    font-weight: 300;
    font-size: 1.5rem;
    color: #ffffff;
  }
}

.v-navigation-drawer__content {
  padding-top: 50px;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
