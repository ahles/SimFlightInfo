<template>
  <div
    class="overlay"
  >
    <div
      class="overlay__content"
    >
      <v-icon
        class="overlay__icon"
      >
        airplanemode_inactive
      </v-icon>
      <h1
        class="display-2"
      >
        {{ $t('Not receiving data') }}
      </h1>
      <v-btn
        dark
        ripple
        class="simulate"
        @click.stop="simulate"
      >
        <v-icon
          dark
        >
          flight
        </v-icon> {{ $t('Simulate') }}
      </v-btn>
    </div>
    <!--  eslint-disable -->
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="overlay__blur-svg">
      <defs>
        <filter id="blur-filter">
          <feGaussianBlur stdDeviation="3"></feGaussianBlur>
        </filter>
      </defs>
    </svg>
    <!-- eslint-enable -->
  </div>
</template>

<script>

export default {
  name: 'Overlay',
  methods: {
    simulate() {
      this.$store.commit('UPDATE_SIMULATION_ACTIVE', true);
      this.$store.dispatch('simulateData');
    },
  },
};
</script>

<style lang="scss">
.overlay {
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: calc(100vh - 48px);
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: grey;
  }

  &__icon {
    font-size: 150px !important;
  }

  &__blur {
    width: 100%;
    height: 100%;
    filter: blur(3px);
  }

  &__blur-svg {
      display: none;
  }
}

.simulate {
  margin-top: 30px;
  .v-icon {
    margin-right: 10px;
  }
}
</style>
