<script setup lang="ts">
import { useAppStateStore } from '../../stores/appState'
import GeonamesUsernameInputComponent from '../gui/GeonamesUsernameInputComponent.vue'

const appState = useAppStateStore()
</script>

<template>
  <Transition name="slide" mode="in-out">
    <aside v-if="appState.sidePanelOpen" class="sidebar">
      <div class="sidebar__content">
        <h2 class="sidebar__title">Settings</h2>
      </div>
      <hr class="sidebar__divider" />
      <div class="sidebar__content">
        <h3 class="sidebar__subtitle">Geonames</h3>
        <GeonamesUsernameInputComponent />
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.sidebar {
  position: fixed;
  right: 0;
  z-index: 20;
  width: var(--sidepanel-width);
  min-height: 100vh;
  top: 0;
  padding-top: calc(var(--header-height) + 1rem);

  background-color: var(--color-panels);
  box-shadow: -0.2rem 0px 0.2rem 0.02rem var(--color-background);
}

.sidebar__title {
  line-height: 1;
}

.sidebar__subtitle {
  line-height: 1;
  margin-bottom: 1rem;
}

.sidebar__content {
  padding: 1rem;
}

.sidebar__divider {
  border: none;
  border-bottom: 1px solid var(--color-text);
  opacity: 30%;
}

.slide-enter-active {
  transition: transform 0.3s ease-out;
}

.slide-leave-active {
  transition: transform 0.3s ease-in;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(var(--sidepanel-width));
}
</style>
