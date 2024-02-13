<script setup lang="ts">
import { computed } from 'vue'
import IconAirplaneComponent from '../icons/IconAirplaneComponent.vue'
import IconCogComponent from '../icons/IconCogComponent.vue'
import IconWindowMinimizeComponent from '../icons/IconWindowMinimizeComponent.vue'
import IconWindowMaximizeComponent from '../icons/IconWindowMaximizeComponent.vue'
import IconWindowCloseComponent from '../icons/IconWindowCloseComponent.vue'
import ButtonComponent from '../gui/ButtonComponent.vue'
import { useAppStateStore } from '../../stores/appState'
import { useSimStateStore } from '../../stores/simState'
import IconConnectionStatusComponent from '../icons/IconConnectionStatusComponent.vue'

const appState = useAppStateStore()
const simState = useSimStateStore()
let maximized = false

function toggleSidepanel() {
  appState.sidePanelToggle()
}

function windowClose() {
  window.ipcRenderer.send('window-close')
}

function windowMinimize() {
  window.ipcRenderer.send('window-minimize')
}

function windowMaximize() {
  if (maximized === false) {
    maximized = true
    window.ipcRenderer.send('window-maximize')
  } else {
    maximized = false
    window.ipcRenderer.send('window-unmaximize')
  }
}

const connectionStatusColor = computed(() => {
  if (simState.connected === false) {
    return 'onnection-status__red'
  } else if (simState.connected === true && simState.active === false) {
    return 'connection-status__yellow'
  } else {
    return 'connection-status__green'
  }
})
const connectionStatusText = computed(() => {
  if (simState.connected === false) {
    return 'Sim not connected'
  } else if (simState.connected === true && simState.active === false) {
    return 'Sim paused'
  } else {
    return 'Sim active'
  }
})
</script>

<template>
  <header class="header">
    <div class="header__left">
      <IconAirplaneComponent class="logo" />
      <span class="title">SimFlightInfo</span>
    </div>
    <div class="header__middle" />
    <div class="header__right">
      <span :title="connectionStatusText"><IconConnectionStatusComponent class="connection-status" :class="connectionStatusColor" /></span>
      <ButtonComponent title="settings" type="icon" class="btn__window btn__window--space-right" @click="toggleSidepanel">
        <IconCogComponent />
      </ButtonComponent>
      <ButtonComponent title="mimimize" type="icon" class="btn__window" @click="windowMinimize">
        <IconWindowMinimizeComponent />
      </ButtonComponent>
      <ButtonComponent title="maximize" type="icon" class="btn__window" @click="windowMaximize">
        <IconWindowMaximizeComponent />
      </ButtonComponent>
      <ButtonComponent title="close" type="icon" class="btn__window" @click="windowClose">
        <IconWindowCloseComponent />
      </ButtonComponent>
    </div>
  </header>
</template>

<style scoped>
.header {
  color: var(--color-text);
  background-color: var(--color-panels);
  height: var(--header-height);
  padding: 0 0.5rem;
  border-bottom: 1px solid black;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow:
    0 0.1rem 0.3rem rgba(0, 0, 0, 0.24),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.48);
}

.header__left,
.header__right {
  display: flex;
  align-items: center;
}

.header__middle {
  -webkit-app-region: drag;
  cursor: grab;
  flex-grow: 1;
  height: 100%;
}

.logo {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
}

.title {
  font-size: 1.2rem;
  line-height: 1;
  pointer-events: none;
}

.btn__window {
  margin-left: 0.5rem;
}

.btn__window--space-right {
  margin-right: 2rem;
}

.connection-status {
  width: 2rem;
  height: 2rem;
}

.connection-status__red {
  color: red;
}

.connection-status__yellow {
  color: yellow;
}

.connection-status__green {
  color: green;
}
</style>
