<template>
  <div
    class="info-panel"
  >
    <div class="info-panel__col info-panel__col--wide">
      <p>
        <span class="info-panel__unit">{{ $t('Latitude') }}</span><br>
        <span class="info-panel__value">{{ latitude.toFixed(5) }}°</span>
      </p>
    </div>

    <div class="info-panel__col info-panel__col--wide">
      <p>
        <span class="info-panel__unit">{{ $t('Longitude') }}</span><br>
        <span class="info-panel__value">{{ longitude.toFixed(5) }}°</span>
      </p>
    </div>

    <div class="info-panel__col info-panel__col--medium">
      <p>
        <span class="info-panel__unit">{{ $t('Heading') }}</span><br>
        <span class="info-panel__value">{{ heading }}°</span>
      </p>
    </div>

    <div class="info-panel__col">
      <p>
        <span class="info-panel__unit">{{ $t('Altitude above sea') }}</span><br>
        <span class="info-panel__value">
          {{ convertMToFeet(roundAltitude(altitudeSea)).toFixed(0) }}&nbsp;ft
        </span>
      </p>
    </div>

    <div class="info-panel__col info-panel__col--medium">
      <p>
        <span class="info-panel__unit">{{ $t('Ground Speed') }}</span><br>
        <span class="info-panel__value">
          {{ convertMSToKnots(groundSpeed).toFixed(0) }}&nbsp;kts
        </span>
      </p>
    </div>

    <div class="info-panel__col info-panel__col--small">
      <Pitch
        :pitch="pitch"
      />
    </div>

    <div class="info-panel__col info-panel__col--small">
      <Roll
        :roll="roll"
      />
    </div>
  </div>
</template>

<script>
import Pitch from '@/components/Pitch.vue';
import Roll from '@/components/Roll.vue';

export default {
  name: 'InfoPanel',
  components: {
    Pitch,
    Roll,
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
  padding: 1rem 0;
  line-height: 1;
  border-radius: 5px;
  box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);
  display: flex;
  justify-content: space-around;

  p {
    margin-bottom: 0;
    line-height: 1.1;
    width: 100%;
  }

  &__col {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;

    &--wide {
      width: 140px;
    }

    &--medium {
      width: 100px;
    }

    &--small {
      width: 60px;
    }
  }

  &__unit {
    font-size: .9rem;
    font-weight: 300;
    white-space: nowrap;
  }

  &__value {
    font-size: 1.6rem;
    font-weight: 400;
    white-space: nowrap;
  }
}
</style>
