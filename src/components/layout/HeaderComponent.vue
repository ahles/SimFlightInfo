<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAppStateStore } from '../../stores/appState'
import IconMenuComponent from '../icons/IconMenuComponent.vue'

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
      simFlightinfo
    </div>
    <div class="header__right">
      <button class="button" title="Open menu" @click="appState.sidePanelToggle">
        <IconMenuComponent />
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  color: var(--color-text);
  background-color: var(--color-panels);
  height: 2rem;
  padding: 0.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: 'Roboto-Regular', sans-serif;
  font-size: 2rem;

  box-shadow:
    0 0.1rem 0.3rem rgba(0, 0, 0, 0.24),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.48);

  transition: top 0.1s ease-out;

  &.hidden {
    top: - var(--header-height);
    transition: top 0.2s ease-in;
  }

  &__right {
    display: flex;
    align-items: center;
  }
}

.home-link {
  text-decoration: none;
  transition: color 0.3s ease-in;

  &:hover {
    color: var(--color-text-highlight);
    transition: color 0.3s ease-in;
  }
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

  &__theme {
    height: 2rem;
  }

  &:hover {
    color: var(--color-text-highlight);
    transition: color 0.3s ease-in;
  }

  &:not(:last-of-type) {
    margin-right: 1rem;
  }
}
</style>
