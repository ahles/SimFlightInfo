<template>
  <div
    class="marker-panel"
  >
    MarkerPanel
  </div>
</template>

<script>

export default {
  name: 'MarkerPanel',
  data: () => ({
    marker: {
      longitude: 0,
      latitude: 0,
      name: '',
    },
  }),
};
</script>

<style lang="scss" scoped>
.marker-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  transform: translate(-50%, -50%);
  background-color: #363636;
  color: white;
  padding: 1rem 0;
  line-height: 1;
  border-radius: 5px;
  box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);
  display: flex;
  justify-content: space-around;
}
</style>
