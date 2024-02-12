<script setup lang="ts">
import IconAlertComponent from "./icons/IconAlertComponent.vue";
import IconCheckComponent from "./icons/IconCheckComponent.vue";
import { useAppStateStore } from '../stores/appState'
import { useSimStateStore } from '../stores/simState'
const appState = useAppStateStore()
const simState = useSimStateStore()
</script>

<template>
  <transition name="fade">
   <div class="connection-information" v-if="appState.loading">
     <p>Connecting to Simulator...</p>
     <transition name="fade">
       <div class="connection-information__status connection-information__status--error" v-if="simState.connected === false && simState.exception !== null">
         <IconAlertComponent class="connection-information__icon" />
         <span class="connection-information__text">{{ simState.exception }}</span>
       </div>
     </transition>
     <transition name="fade">
       <div class="connection-information__status connection-information__status--success" v-if="simState.connected">
         <IconCheckComponent class="connection-information__icon" />
         <span class="connection-information__text">Connected to Kitty Hawk</span>
       </div>
     </transition>
   </div>
  </transition>
</template>

<style scoped>
.connection-information {
  border: 1px solid white;
}

.connection-information__icon {
  height: 2rem;
  margin-right: 1rem;
}

.connection-information__text {
  display: block;
  font-size: 1.2rem;
}

.connection-information__status {
  display: flex;
  align-items: center;
}

.connection-information__status--error {
  color: var(--color-error);
}

.connection-information__status--success {
  color: var(--color-success);
}
</style>
