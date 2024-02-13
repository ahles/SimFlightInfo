<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <button :title="title" type="button">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  cursor: pointer;
  border: 1px solid var(--color-accent-1);
  color: white;
  background-color: var(--color-accent-1);
  appearance: none;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  line-height: 1;
  white-space: nowrap;

  &:hover {
    background-color: white;
    color: var(--color-accent-1);
    border-color: var(--color-accent-1);
    transition: all 0.2s ease-in;
  }

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>