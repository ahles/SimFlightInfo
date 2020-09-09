<template>
  <v-alert
    v-model="simulating"
    type="warning"
    class="simulating"
    icon="cast"
  >
    {{ $t('Simulating') }}
    <v-btn
      title="stop"
      color="warning"
      ripple
      outlined
      small
      class="simulating__stop"
      @click.stop="stopSimulation"
    >
      <v-icon dark>
        cancel
      </v-icon>
    </v-btn>
  </v-alert>
</template>

<script>
const { remote } = require('electron');

export default {
  name: 'SimulationBar',
  props: {
    simulating: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.window = remote.getCurrentWindow();
  },
  methods: {
    stopSimulation() {
      this.$store.commit('SET_SIMULATION_ACTIVE', false);
      this.window.reload();
    },
  },
};
</script>

<style lang="scss">
.simulating {
  margin-top: 0;
  padding: 8px 16px;
  display: flex;
  justify-content: flex-end;

  .v-icon {
    color: white !important;
  }

  &__stop {
    min-width: 40px;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
}
</style>
