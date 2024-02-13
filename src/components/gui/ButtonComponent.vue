<script setup lang="ts">
defineProps<{
  title: string
  type: 'text' | 'icon'
}>()
</script>

<template>
  <button :title="title" type="button" class="btn" :class="`btn__${type}`">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  appearance: none;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.btn__icon {
  width: 2rem;
  height: 2rem;
  color: var(--color-text);
}

.btn__icon:hover {
  color: var(--color-text-highlight);
  transition: color 0.2s ease-in;
}

.btn__text {
  color: var(--color-text-highlight);
  background-color: var(--color-accent-1);
  padding: 0.5rem 1rem;
  border-radius: 3px;
}

.btn__text:hover {
  color: var(--color-accent-1);
  background-color: var(--color-text-highlight);
  transition: all 0.2s ease-in;
}
</style>
