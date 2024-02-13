<script setup lang="ts">
import { ref } from 'vue'
import IconAirplaneComponent from '../icons/IconAirplaneComponent.vue';
import IconWindowMinimizeComponent from '../icons/IconWindowMinimizeComponent.vue';
import IconWindowMaximizeComponent from '../icons/IconWindowMaximizeComponent.vue';
import IconWindowCloseComponent from '../icons/IconWindowCloseComponent.vue';
import ButtonComponent from '../gui/ButtonComponent.vue';

const header = ref(null)
let maximized = false

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
      <span class="title">SimFlightInfo</span>
    </div>
    <div class="header__middle"></div>
    <div class="header__right">
      <ButtonComponent @click="windowMinimize" title="mimimize" type="icon"><IconWindowMinimizeComponent /></ButtonComponent>
      <ButtonComponent @click="windowMaximize" title="maximize" type="icon"><IconWindowMaximizeComponent /></ButtonComponent>
      <ButtonComponent @click="windowClose" title="close" type="icon"><IconWindowCloseComponent /></ButtonComponent>
    </div>
  </header>
</template>

<style scoped>
.header {
  color: var(--color-text);
  background-color: var(--color-panels);
  height: 2rem;
  padding: 0.5rem;

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
}
</style>
