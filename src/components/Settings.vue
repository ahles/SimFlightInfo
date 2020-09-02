<template>
  <ul class="settings">
    <li class="settings__header">
      <p>
        {{ $t('Settings') }}
      </p>
    </li>
    <li class="settings__lock">
      <p>{{ $t('Map follows airplane') }}</p>
      <p>
        <v-switch
          class="lock__switch"
          :label="(data.mapLockedToPosition) ? $t('Yes') : $t('No')"
          :input-value="data.mapLockedToPosition"
          ripple
          @change="updateMapLockedToPosition"
        />
      </p>
    </li>
    <li class="settings__zoom">
      <p>{{ $t('Zoom level') }}</p>
      <p>
        <v-slider
          :value="data.zoomLevel"
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
      data: (state) => state.data,
      locale: (state) => state.locale,
    }),
  },
  methods: {
    updateMapLockedToPosition(event) {
      this.$store.commit('UPDATE_MAP_LOCKED_TO_POSITION', event);
    },
    updateZoomLevel(event) {
      this.$store.commit('UPDATE_ZOOM_LEVEL', event);
    },
    changeLangInLocalstorage() {
      this.$store.commit('SET_LOCALE', this.$i18n.locale);
    },
  },
};
</script>

<style lang="scss">
.settings {
  color: white;
  list-style-type: none;
  padding: 0 !important;

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
}
</style>
