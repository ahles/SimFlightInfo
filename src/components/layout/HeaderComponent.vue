<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAppStateStore } from '../../stores/appState'
import IconMenuComponent from '../icons/IconMenuComponent.vue'
import IconAirplaneComponent from '../icons/IconAirplaneComponent.vue';

const header = ref(null)

onMounted(() => {
  // @ts-ignore
  const headerDiv: HTMLDivElement = header.value
  window.onscroll = function () {
    if (headerDiv) {
      if (window.scrollY <= headerDiv.clientHeight) {
        headerDiv.classList.remove('hidden')
      } else {
        headerDiv.classList.add('hidden')
      }
    }
  }
})

const appState = useAppStateStore()
</script>

<template>
  <header ref="header" class="header">
    <div class="header__left">
      <IconAirplaneComponent class="logo" />
      <span class="title">SimFlightInfo</span>
    </div>
    <div class="header__right">
      <button class="button" title="Open menu" @click="appState.sidePanelToggle">
        <IconMenuComponent />
      </button>
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

  transition: top 0.1s ease-out;

  &.hidden {
    top: - var(--header-height);
    transition: top 0.2s ease-in;
  }
}

.header__left,
.header__right {
  display: flex;
  align-items: center;
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

.button {
  display: block;
  height: 3rem;
  aspect-ratio: 1;
  color: inherit;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.3s ease-in;

  &:hover {
    color: var(--color-text-highlight);
    transition: color 0.3s ease-in;
  }

  &:not(:last-of-type) {
    margin-right: 1rem;
  }
}
</style>
