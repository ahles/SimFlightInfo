<script setup lang="ts">
defineProps<{
  title: string
  variant: 'text' | 'icon' | 'gui'
}>()
</script>

<template>
  <button :title="title" type="button" class="btn" :class="`btn--${variant}`">
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

.btn--icon {
  width: 2rem;
  height: 2rem;
  color: var(--color-text);
}

.btn--icon:hover {
  color: var(--color-text-highlight);
  transition: color 0.2s ease-in;
}

.btn--text {
  color: var(--color-text-highlight);
  background-color: var(--color-accent-1);
  padding: 0.5rem 1rem;
  border-radius: 3px;
}

.btn--text:hover {
  color: var(--color-accent-1);
  background-color: var(--color-text-highlight);
  transition: all 0.2s ease-in;
}
</style>
