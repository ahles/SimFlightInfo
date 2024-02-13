<script setup lang="ts">
import IconReloadComponent from "./icons/IconReloadComponent.vue";
import IconAlertComponent from "./icons/IconAlertComponent.vue";
import IconCheckComponent from "./icons/IconCheckComponent.vue";
import ButtonComponent from "./gui/ButtonComponent.vue";
import { useAppStateStore } from '../stores/appState'
import { useSimStateStore } from '../stores/simState'
const appState = useAppStateStore()
const simState = useSimStateStore()

function retry() {
  appState.loading = true
  simState.connected = false
  simState.exception = null
  setTimeout(() => {
    window.ipcRenderer.send('retry-sim-connection')
  }, 1000)
}
</script>

<template>
  <div class="connection-information">
    <h2>Connecting to Simulator...</h2>
    <transition name="fade">
      <div class="connection-information__status connection-information__status--error" v-if="simState.connected === false && simState.exception !== null">
        <IconAlertComponent class="connection-information__icon" />
        <div class="connection-information__text">{{ simState.exception }}</div>
        <ButtonComponent class="connection-information__retry" @click="retry" title="retry" type="icon"><IconReloadComponent /></ButtonComponent>
      </div>
    </transition>
    <transition name="fade">
      <div class="connection-information__status connection-information__status--success" v-if="simState.connected">
        <IconCheckComponent class="connection-information__icon" />
        <span class="connection-information__text">Connected to Kitty Hawk</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.connection-information h2 {
  text-align: center;
  margin-bottom: 4rem;
}

.connection-information__icon {
  height: 2rem;
}

.connection-information__text {
  display: block;
  font-size: 1.2rem;
}

.connection-information__retry {
  width: 4rem;
  height: 4rem;
  margin-top: 4rem;
}

.connection-information__status {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.connection-information__status--error {
  color: var(--color-error);
}

.connection-information__status--success {
  color: var(--color-success);
}
</style>
