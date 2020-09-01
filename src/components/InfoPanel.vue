<template>
  <div
    class="info-panel"
  >
    <div class="info-panel__col info-panel__col--wide">
      <p>
        <span class="info-panel__unit">{{ $t('Latitude') }}</span><br>
        {{ latitude.toFixed(5) }}°
      </p>
    </div>

    <div class="info-panel__col info-panel__col--wide">
      <p>
        <span class="info-panel__unit">{{ $t('Longitude') }}</span><br>
        {{ longitude.toFixed(5) }}°
      </p>
    </div>

    <div class="info-panel__col info-panel__col--narrow">
      <p>
        <span class="info-panel__unit">{{ $t('Heading') }}</span><br>
        {{ heading }}°
      </p>
    </div>

    <div class="info-panel__col">
      <p>
        <span class="info-panel__unit">{{ $t('Altitude above sea') }}</span><br>
        {{ convertMToFeet(roundAltitude(altitudeSea)).toFixed(0) }}&nbsp;ft
      </p>
    </div>

    <div class="info-panel__col info-panel__col--narrow">
      <p>
        <span class="info-panel__unit">{{ $t('Ground Speed') }}</span><br>
        {{ convertMSToKnots(groundSpeed).toFixed(0) }}&nbsp;kts
      </p>
    </div>

    <div class="info-panel__col info-panel__col--narrow">
      <Pitch
        :pitch="pitch"
      />
    </div>

    <div class="info-panel__col info-panel__col--narrow">
      <p>
        <span class="info-panel__unit">{{ $t('Roll') }}</span><br>
        {{ roll }}°
      </p>
    </div>
  </div>
</template>

<script>
import Pitch from '@/components/Pitch.vue';

export default {
  name: 'InfoPanel',
  components: {
    Pitch,
  },
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
  min-width: 760px;
  max-width: 1024px;
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
    flex-basis: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    &--wide {
      flex-basis: 140px;
    }

    &--narrow {
      flex-basis: 100px;
    }
  }

  &__unit {
    font-size: .8rem;
  }
}
</style>
