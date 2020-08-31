<template>
  <v-list
    class="settings"
  >
    <v-list-item>
      <v-icon
        v-if="settings"
        @click="settings = false"
      >
        mdi-arrow-down-drop-circle-outline
      </v-icon>
      <v-icon
        v-else
        @click="settings = true"
      >
        mdi-arrow-up-drop-circle-outline
      </v-icon>
      <span
        class="section-header"
      >
        {{ $t('Settings') }}
      </span>
    </v-list-item>
    <div
      v-if="settings"
    >
      <v-divider />
      <v-list-item>
        <v-list-item-content>
          <v-switch
            :label="$t('Move map')"
            :input-value="data.mapLockedToPosition"
            ripple
            @change="updateMapLockedToPosition"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        class="zoom-level"
      >
        <v-list-item-title>
          {{ $t('Zoom level') }}
        </v-list-item-title>
        <v-list-item-content>
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
            @change="updateZoomLevel"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        class="language"
      >
        <v-list-item-title>
          {{ $t('Language') }}
        </v-list-item-title>
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
    </div>
  </v-list>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Settings',
  data: () => ({
    settings: false,
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
  watch: {
  },
  mounted() {
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

<style lang="scss" scoped>
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
    align-self: flex-start;
  }
}
</style>
