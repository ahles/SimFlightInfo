<template>
  <ul class="settings">
    <li class="settings__header">
      <p>
        {{ $t('Settings') }}
      </p>
    </li>
    <!--
    <li class="settings__lock">
      <p>{{ $t('Show info panel') }}</p>
      <p>
        <v-switch
          class="info_panel"
          :label="(showInfoPanel) ? $t('Yes') : $t('No')"
          :input-value="showInfoPanel"
          ripple
          dense
          @change="updateShowInfoPanel"
        />
      </p>
    </li>

    <li class="settings__marker">
      <p>{{ $t('Show marker panel') }}</p>
      <p>
        <v-switch
          class="marker_panel"
          :label="(showMarkerPanel) ? $t('Yes') : $t('No')"
          :input-value="showMarkerPanel"
          ripple
          dense
          @change="updateShowMarkerPanel"
        />
      </p>
    </li>
    -->

    <li class="settings__geonames">
      <p
        class="mb-5"
      >
        {{ $t('Show Geonames panel') }}
      </p>
      <p>
        <v-switch
          class="geonames_panel"
          :label="(showGeonamesPanel) ? $t('Yes') : $t('No')"
          :input-value="showGeonamesPanel"
          ripple
          dense
          @change="updateShowGeonamesPanel"
        />
      </p>
      <div
        v-if="showGeonamesPanel"
        class="mt-2"
      >
        <p
          v-if="geonamesUser === null || geonamesUser === ''"
          class="settings__geonames__hint mt-5 mb-5"
        >
          {{ $t('Please enter a Geonames username') }}<br>
          <a
            href="https://www.geonames.org/login"
            class="link"
            target="_blank"
          >
            {{ $t('Geonames Registration') }}
          </a>
        </p>
        <p>
          <v-text-field
            :value="geonamesUser"
            :label="$t('Geonames User')"
            filled
            dense
            @blur="updateGeonamesUsername"
          />
        </p>
      </div>
    </li>

    <li class="settings__lock">
      <p>{{ $t('Map follows airplane') }}</p>
      <p>
        <v-switch
          class="lock__switch"
          :label="(mapLockedToPosition) ? $t('Yes') : $t('No')"
          :input-value="mapLockedToPosition"
          ripple
          dense
          @change="updateMapLockedToPosition"
        />
      </p>
    </li>
    <li class="settings__zoom">
      <p>{{ $t('Zoom level') }}</p>
      <p>
        <v-slider
          :value="zoomLevel"
          min="0"
          max="18"
          step="1"
          ticks="always"
          light
          color="rgba(255, 255, 255, 0.75)"
          track-color="rgba(255, 255, 255, 0.75)"
          thumb-label="always"
          :thumb-size="24"
          class="zoom-slider"
          @change="updateZoomLevel"
        />
      </p>
    </li>
    <li class="settings__lang">
      <p>{{ $t('Language') }}</p>
      <p>
        <v-select
          v-model="$i18n.locale"
          dense
          outlined
          :items="langs"
          class="lang-select"
          @change="changeLangInLocalstorage()"
        />
      </p>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Settings',
  data: () => ({
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
      locale: (state) => state.userSettings.locale,
      mapLockedToPosition: (state) => state.userSettings.mapLockedToPosition,
      zoomLevel: (state) => state.userSettings.zoomLevel,
      showInfoPanel: (state) => state.userSettings.showInfoPanel,
      showGeonamesPanel: (state) => state.userSettings.showGeonamesPanel,
      showMarkerPanel: (state) => state.userSettings.showMarkerPanel,
      geonamesUser: (state) => state.userSettings.geonamesUser,
    }),
  },
  methods: {
    updateMapLockedToPosition(event) {
      this.$store.commit('SET_MAP_LOCKED_TO_POSITION', event);
    },
    updateZoomLevel(event) {
      this.$store.commit('SET_ZOOM_LEVEL', event);
    },
    changeLangInLocalstorage() {
      this.$store.commit('SET_LOCALE', this.$i18n.locale);
    },
    updateShowGeonamesPanel(event) {
      this.$store.commit('SET_SHOW_GEONAMES_PANEL', event);
    },
    updateGeonamesUsername(event) {
      this.$store.commit('SET_GEONAMES_USER', event.target.value);
    },
  },
};
</script>

<style lang="scss">
.settings {
  color: white;
  list-style-type: none;
  padding: 0 !important;
  line-height: 1;

  p {
    margin-bottom: 0;
  }

  li {
    padding: 20px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }

  .v-messages,
  .v-text-field__details {
    display: none;
  }

  &__header {
    padding: 30px 0;

    p {
      font-size: 2rem;
      font-weight: 300;
    }
  }

  &__zoom {

    .zoom-slider {
      padding-top: 32px;

      .v-input__slot {
        margin-bottom: 0;
      }

      .v-slider__thumb-label {
        color: black;
      }
    }
  }

  &__lang {
    .lang-select {
      padding-top: 12px;
      width: 80px;
    }
  }

  &__geonames {

    &__hint {
      font-weight: 300;
      font-size: 90%;
    }
  }
}
</style>
