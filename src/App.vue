<template>
  <v-app>
    <Header />
    <v-navigation-drawer
      v-model="drawer"
      app
      right
      dark
      absolute
    >
      <v-list
        class="flight"
      >
        <v-list-item>
          <v-icon
            large
          >
            flight
          </v-icon>
          <span
            class="section-header"
          >
            {{ $t('Position') }}
          </span>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('Latitude') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ data.latitude.toFixed(5) }}°
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('Longitude') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ data.longitude.toFixed(5) }}°
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('Altitude above sea') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ convertMToFeet(roundAltitude(data.altitudeSea)).toFixed(0) }} feet<br>
              {{ roundAltitude(data.altitudeSea) }} m
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('Bearing') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ data.bearing.toFixed(1) }}°
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('Heading') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ data.heading }}°
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('Ground Speed') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ convertMSToKnots(data.groundSpeed).toFixed(0) }} kts<br>
              {{ convertMSToKmh(data.groundSpeed).toFixed(0) }} km/h
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('Pitch') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ data.pitch }}°
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('Roll') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ data.roll }}°
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <Settings />
    </v-navigation-drawer>

    <v-main
      :class="{ overlay__blur: !data.receivingData }"
    >
      <PositionMarker
        v-if="data.mapLockedToPosition"
      />

      <Map
        :message-index="data.messageIndex"
        :latitude="data.latitude"
        :longitude="data.longitude"
        :bearing="data.bearing"
        :zoom-level="data.zoomLevel"
        :map-locked-to-position="data.mapLockedToPosition"
      />
      <SimulationBar
        :simulating="simulationActive"
      />
    </v-main>
    <v-btn
      v-if="!drawer"
      dark
      small
      absolute
      bottom
      right
      fab
      ripple
      class="menu"
      @click.stop="drawer = !drawer"
    >
      <v-icon dark>
        flight
      </v-icon>
    </v-btn>
    <v-btn
      v-else
      dark
      small
      absolute
      bottom
      right
      fab
      ripple
      class="close"
      @click.stop="drawer = !drawer"
    >
      <v-icon
        dark
      >
        arrow_forward_ios
      </v-icon>
    </v-btn>

    <Overlay
      v-if="!data.receivingData"
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

export default {
  name: 'App',
  components: {
    Header,
    Map,
    Settings,
    SimulationBar,
    Overlay,
    PositionMarker,
  },
  data: () => ({
    drawer: false,
    window: null,
  }),
  computed: {
    ...mapState({
      data: (state) => state.data,
      locale: (state) => state.locale,
      simulationActive: (state) => state.simulationActive,
    }),
  },
  beforeCreate() {
    this.$store.dispatch('receiveData');
  },
  created() {
    this.$i18n.locale = this.locale;
  },
  methods: {
    convertMSToKnots(ms) {
      return ms * 1.943844;
    },
    convertMSToKmh(ms) {
      return ms * 3.6;
    },
    convertMToFeet(m) {
      return m * 3.28084;
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
  font-size: 1.6rem;
  font-weight: 300;
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
</style>
