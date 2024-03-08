<script setup lang="ts">
import IconReloadComponent from './icons/IconReloadComponent.vue'
import IconAlertComponent from './icons/IconAlertComponent.vue'
import IconCheckComponent from './icons/IconCheckComponent.vue'
import ButtonComponent from './gui/ButtonComponent.vue'
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
    <h2>Connecting to the Simulator</h2>
    <transition name="slide-fade">
      <div v-if="simState.connected === false && simState.exception !== null" class="connection-information__status connection-information__status--error">
        <IconAlertComponent class="connection-information__icon" />
        <div class="connection-information__text">
          {{ simState.exception }}
        </div>
        <ButtonComponent class="connection-information__retry" title="retry" variant="icon" @click="retry">
          <IconReloadComponent />
        </ButtonComponent>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="simState.connected" class="connection-information__status connection-information__status--success">
        <IconCheckComponent class="connection-information__icon" />
        <span class="connection-information__text">Connected to Kitty Hawk</span>
      </div>
    </transition>
  </div>
  <div class="connection-information__background">
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
  </div>
</template>

<style scoped>
.connection-information {
  position: absolute;
  z-index: 13;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 50%);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow:
    0 0.1rem 0.3rem rgba(0, 0, 0, 0.24),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.48);
}

.connection-information h2 {
  text-align: center;
}

.connection-information__icon {
  height: 2rem;
}

.connection-information__text {
  text-align: center;
  display: block;
  font-size: 1.2rem;
  font-weight: 400;
  margin-top: 1rem;
}

.connection-information__retry {
  width: 4rem;
  height: 4rem;
  margin-top: 2rem;
}

.connection-information__status {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.connection-information__status--error {
  color: var(--color-text);
}

.connection-information__status--success {
  color: var(--color-success);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
  transform: translateY(-2rem);
  opacity: 0;
}

/* https://codepen.io/baarbaracrr/pen/KKovmGb */
.connection-information__background {
  position: absolute;
  z-index: 11;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, rgba(10,38,71,1) 3%, rgba(20,66,114,1) 38%, rgb(32, 82, 149) 68%, rgba(44,116,179,1) 98%);
  animation: gradient 30s ease infinite;
  background-size: 400% 400%;
  background-attachment: fixed;
}

@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.wave {
  background: rgb(0 0 0 / 25%);
  border-radius: 1000% 1000% 0 0;
  position: fixed;
  width: 200%;
  height: 12em;
  animation: wave 10s -3s linear infinite;
  transform: translate3d(0, 0, 0);
  opacity: 0.8;
  bottom: 0;
  left: 0;
  z-index: 12;
}

.wave:nth-of-type(2) {
  bottom: -1.25em;
  animation: wave 18s linear reverse infinite;
  opacity: 0.8;
}

.wave:nth-of-type(3) {
  bottom: -2.5em;
  animation: wave 20s -1s reverse infinite;
  opacity: 0.9;
}

@keyframes wave {
  2% {
    transform: translateX(1);
  }

  25% {
    transform: translateX(-25%);
  }

  50% {
    transform: translateX(-50%);
  }

  75% {
    transform: translateX(-25%);
  }

  100% {
    transform: translateX(1);
  }
}
</style>
