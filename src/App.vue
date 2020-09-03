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
          v-if="mapLockedToPosition && data.messageIndex > 0"
        />
      </transition>

      <transition name="fade">
        <Map
          v-if="data.messageIndex > 0"
          :message-index="data.messageIndex"
          :latitude="data.latitude"
          :longitude="data.longitude"
          :heading="data.heading"
          :zoom-level="zoomLevel"
          :map-locked-to-position="mapLockedToPosition"
        />
      </transition>

      <transition name="fade">
        <InfoPanel
          v-if="data.messageIndex > 0"
          :latitude="data.latitude"
          :longitude="data.longitude"
          :heading="data.heading"
          :altitude-sea="data.altitudeSea"
          :ground-speed="data.groundSpeed"
          :pitch="data.pitch"
          :roll="data.roll"
        />
      </transition>

      <SimulationBar
        :simulating="simulationActive"
      />

      <Geonames
        v-if="receivingData"
        :latitude="data.latitude"
        :longitude="data.longitude"
      />
    </v-main>

    <Overlay
      v-if="!receivingData"
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
  computed: {
    ...mapState({
      data: (state) => state.data,
      locale: (state) => state.locale,
      simulationActive: (state) => state.simulationActive,
      receivingData: (state) => state.receivingData,
      mapLockedToPosition: (state) => state.mapLockedToPosition,
      zoomLevel: (state) => state.zoomLevel,
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
  beforeCreate() {
    this.$store.dispatch('receiveData');
  },
  created() {
    this.$i18n.locale = this.locale;
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
