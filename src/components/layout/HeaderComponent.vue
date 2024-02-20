<script setup lang="ts">
import IconAirplaneComponent from '../icons/IconAirplaneComponent.vue'
import IconCogComponent from '../icons/IconCogComponent.vue'
import IconWindowMinimizeComponent from '../icons/IconWindowMinimizeComponent.vue'
import IconWindowMaximizeComponent from '../icons/IconWindowMaximizeComponent.vue'
import IconWindowCloseComponent from '../icons/IconWindowCloseComponent.vue'
import ButtonComponent from '../gui/ButtonComponent.vue'
import { useAppStateStore } from '../../stores/appState'

const appState = useAppStateStore()
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
</script>

<template>
  <header class="header">
    <div class="header__left">
      <IconAirplaneComponent class="logo" />
      <h1 class="title">SimFlightInfo</h1>
    </div>
    <div class="header__middle" />
    <div class="header__right">
      <ButtonComponent title="settings" variant="icon" class="btn__window btn__window--space-right" @click="toggleSidepanel">
        <IconCogComponent />
      </ButtonComponent>
      <ButtonComponent title="mimimize" variant="icon" class="btn__window btn__window--gui  btn__window--minimize" @click="windowMinimize">
        <IconWindowMinimizeComponent />
      </ButtonComponent>
      <ButtonComponent title="maximize" variant="icon" class="btn__window btn__window--gui" @click="windowMaximize">
        <IconWindowMaximizeComponent />
      </ButtonComponent>
      <ButtonComponent title="close" variant="icon" class="btn__window btn__window--gui" @click="windowClose">
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
  position: absolute;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;

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

.btn__window--gui {
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: border-color .1s ease-in;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px
}

.btn__window--gui:hover {
  border-color: rgba(255, 255, 255, 0.35);
  transition: border-color .1s ease-in;
}

.btn__window--minimize {

  padding-top: 0.5rem;
}

.btn__window--space-right {
  margin-right: 2rem;
}
</style>
