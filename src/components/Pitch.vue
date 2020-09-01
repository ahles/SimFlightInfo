<template>
  <div class="pitch">
    <svg
      class="pitch__svg"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        class="pitch__horizon"
        x1="0"
        y1="50%"
        x2="100%"
        y2="50%"
        stroke="white"
      />
      <rect
        class="pitch__airplane"
        x="10%"
        y="48%"
        width="80%"
        height="4%"
        fill="black"
        stroke="none"
        :style="`transform: rotateZ(${pitch}deg)`"
      />
      <ellipse
        class="pitch__border"
        cx="50%"
        cy="50%"
        rx="49%"
        ry="49%"
        fill="none"
        stroke="white"
      />
    </svg>
    <span
      class="pitch__value"
    >
      {{ pitch }}°
    </span>
  </div>
</template>

<script>
export default {
  name: 'Pitch',
  props: {
    pitch: {
      required: true,
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.pitch {
  position: relative;
  width: 75px;
  height: 75px;

  &__horizon {
    stroke: grey;
  }

  &__airplane {
    transform-origin: center center;
    fill: rgba(0, 0, 0, 0.9);
  }

  &__value {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
