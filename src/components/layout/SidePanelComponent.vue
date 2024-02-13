<script setup lang="ts">
import { useAppStateStore } from '../../stores/appState'

const appState = useAppStateStore()

</script>

<template>
  <Transition name="slide" mode="in-out">
    <aside v-if="appState.sidePanelOpen" class="sidebar">
        Settings
    </aside>
  </Transition>
</template>

<style scoped>
.sidebar {
  position: fixed;
  width: var(--sidepanel-width);
  min-height: calc(100vh - var(--header-height));
  top: calc(var(--header-height) + 1px);
  right: 0;
  z-index: 10;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  padding: 2rem;

  background-color: var(--color-panels);
  box-shadow:
    0 0.1rem 0.3rem rgba(0, 0, 0, 0.24),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.48);
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
