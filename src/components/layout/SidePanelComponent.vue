<script setup lang="ts">
import { useAppStateStore } from '../../stores/appState'

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
        <label class="textinput__label" for="geonames">Enter your Geoname username:</label>
        <input class="textinput" type="text" id="geonames" name="geonames" placeholder="enter your username" value="">
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.sidebar {
  position: fixed;
  right: 0;
  z-index: 10;
  width: var(--sidepanel-width);
  min-height: calc(100vh - var(--header-height));
  top: calc(var(--header-height) + 1px);

  background-color: var(--color-panels);
  box-shadow:
    0 0.1rem 0.3rem rgba(0, 0, 0, 0.24),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.48);
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

.textinput {
  width: 100%;
  color: var(--color-text);
  background-color: var(--color-background);
  border: 1px solid var(--color-text);
  padding: 0.5rem 0.75rem;
  font-family: inherit;
  font-size: 1.2rem;
  outline: none;
  font-weight: 300;
}

.textinput:focus {
  border-color: var(--color-text-highlight);
  transition: border-color .2s ease-in;
}

.textinput::placeholder {
  color: var(--color-text);
  opacity: 0.5;
}

.textinput__label {
  display: none;
  font-size: 1rem;
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
