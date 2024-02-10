<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStateStore } from '../../stores/appState'

const appState = useAppStateStore()

const { loading } = storeToRefs(appState)
const showHint = ref(false)

let timeoutId: number | null = null

// When loading changes to true, wait 3 sec to display the text hint
watch(loading, (newValue) => {
  if (newValue) {
    timeoutId = window.setTimeout(() => {
      showHint.value = true
    }, 3000)
  } else {
    showHint.value = false
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId)
    }
  }
})
</script>

<template>
  <transition name="fade">
    <div v-if="loading" class="loading-bar">
      <div class="loading-bar__line"></div>
      <transition name="fade">
        <div v-if="showHint" class="loading-bar__text">Loading ...</div>
      </transition>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.loading-bar {
  position: fixed;
  z-index: 40;
  top: 0;
  left: 0;
  right: 0;

  &__line {
    height: 0.25rem;

    animation: animateBg 2s infinite linear;
    background-color: #fff;
    background-image: linear-gradient(
      90deg,
      var(--color-accent-1),
      var(--color-accent-1),
      var(--color-accent-1),
      var(--color-white),
      var(--color-accent-1),
      var(--color-accent-1),
      var(--color-accent-1),
      var(--color-white)
    );
    background-size: 300% 100%;
  }

  &__text {
    font-family: 'Roboto-Regular', sans-serif;
    font-weight: normal;
    text-align: center;
    color: var(--color-accent-1);
  }
}

@keyframes animateBg {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
