<script setup lang="ts">
import IconReloadComponent from "./icons/IconReloadComponent.vue";
import IconAlertComponent from "./icons/IconAlertComponent.vue";
import IconCheckComponent from "./icons/IconCheckComponent.vue";
import ButtonComponent from "./gui/ButtonComponent.vue";
import { useAppStateStore } from '../stores/appState'
import { useSimStateStore } from '../stores/simState'
const appState = useAppStateStore()
const simState = useSimStateStore()

function retry() {
  console.log('retry connection');
}

</script>

<template>
  <transition name="fade">
   <div class="connection-information" v-if="appState.loading">
     <p>Connecting to Simulator...</p>
     <transition name="fade">
        <div class="connection-information__status connection-information__status--error" v-if="simState.connected === false && simState.exception !== null">
          <IconAlertComponent class="connection-information__icon" />
          <div class="connection-information__text">{{ simState.exception }}</div>
          <ButtonComponent @click="retry" class="connection-information__button" title="retry"><IconReloadComponent /></ButtonComponent>
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
/* .connection-information {
  border: 1px solid white;
} */

.connection-information__icon {
  height: 2rem;
}

.connection-information__text {
  display: block;
  font-size: 1.2rem;
}

.connection-information__button {
  width: 4rem;
  height: 4rem;
  padding: 0;
  color: var(--color-accent-1);
  background: none;
  border: none;
}

.connection-information__status {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.connection-information__status--error {
  color: var(--color-error);
}

.connection-information__status--success {
  color: var(--color-success);
}
</style>
