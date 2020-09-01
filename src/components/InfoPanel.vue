<template>
  <div
    class="info-panel"
  >
    <div class="info-panel__col info-panel__col--wide">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <p
            v-bind="attrs"
            v-on="on"
          >
            {{ latitude.toFixed(5) }}°
          </p>
        </template>
        <span>{{ $t('Latitude') }}</span>
      </v-tooltip>
    </div>

    <div class="info-panel__col info-panel__col--wide">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <p
            v-bind="attrs"
            v-on="on"
          >
            {{ longitude.toFixed(5) }}°
          </p>
        </template>
        <span>{{ $t('Longitude') }}</span>
      </v-tooltip>
    </div>

    <div class="info-panel__col info-panel__col--narrow">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <p
            v-bind="attrs"
            v-on="on"
          >
            {{ heading }}°
          </p>
        </template>
        <span>{{ $t('Heading') }}</span>
      </v-tooltip>
    </div>

    <div class="info-panel__col">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <p
            v-bind="attrs"
            v-on="on"
          >
            {{ convertMToFeet(roundAltitude(altitudeSea)).toFixed(0) }}&nbsp;ft
          </p>
        </template>
        <span>{{ $t('Altitude above sea') }}</span>
      </v-tooltip>
    </div>

    <div class="info-panel__col info-panel__col--narrow">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <p
            v-bind="attrs"
            v-on="on"
          >
            {{ convertMSToKnots(groundSpeed).toFixed(0) }}&nbsp;kts
          </p>
        </template>
        <span>{{ $t('Ground Speed') }}</span>
      </v-tooltip>
    </div>

    <div class="info-panel__col info-panel__col--narrow">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <p
            v-bind="attrs"
            v-on="on"
          >
            {{ pitch }}°
          </p>
        </template>
        <span>{{ $t('Pitch') }}</span>
      </v-tooltip>
    </div>

    <div class="info-panel__col info-panel__col--narrow">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <p
            v-bind="attrs"
            v-on="on"
          >
            {{ roll }}°
          </p>
        </template>
        <span>{{ $t('Roll') }}</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>

export default {
  name: 'InfoPanel',
  props: {
    latitude: {
      required: true,
      type: Number,
      default: 0,
    },
    longitude: {
      required: true,
      type: Number,
      default: 0,
    },
    heading: {
      required: true,
      type: Number,
      default: 0,
    },
    altitudeSea: {
      required: true,
      type: Number,
      default: 0,
    },
    groundSpeed: {
      required: true,
      type: Number,
      default: 0,
    },
    roll: {
      required: true,
      type: Number,
      default: 0,
    },
    pitch: {
      required: true,
      type: Number,
      default: 0,
    },
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

<style lang="scss" scoped>
.info-panel {
  position: absolute;
  bottom: 20px;
  left: 50%;
  width: calc(100vw - 40px);
  transform: translateX(-50%);
  background-color: #363636;
  color: white;
  padding: 1rem;
  line-height: 1;
  border-radius: 5px;
  box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);
  display: flex;
  justify-content: space-between;

  p {
    margin-bottom: 0;
    font-size: 1.5rem;
    font-weight: 300;
  }

  &__col {
    // border: 1px solid white;
    padding: 5px 10px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    &--wide {
      width: 140px;
    }

    &--narrow {
      width: 100px;
    }
  }
}
</style>
