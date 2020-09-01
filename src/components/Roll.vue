<template>
  <div class="roll">
    <svg
      class="roll__svg"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        class="roll__border"
        cx="50%"
        cy="50%"
        rx="49%"
        ry="49%"
        fill="none"
        stroke="white"
      />
    </svg>

    <span
      v-if="showValue"
      class="roll__value"
    >
      {{ rollLocal }}°
    </span>

    <!-- eslint-disable -->
    <svg class="roll__airplane" width="684.29" height="207.86" version="1.1" viewBox="0 0 181.05 54.996" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-13.796 -83.911)">
          <g fill="#ffffff" stroke-width=".26458">
            <rect x="15.119" y="114.9" width="178.4" height="8.3155"/>
            <ellipse cx="104.32" cy="118.31" rx="15.119" ry="19.277"/>
            <rect x="102.24" y="85.234" width="4.9137" height="15.119"/>
          </g>
      </g>
    </svg>

    <!-- eslint-disable -->
  </div>
</template>

<script>
export default {
  name: 'Roll',
  props: {
    roll: {
      required: true,
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    showValue: false,
  }),
  computed: {
    rollLocal() {
      return Number(this.roll).toFixed(0);
    },
  },
};
</script>

<style lang="scss" scoped>
.roll {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
   -4px -4px 12px 0 rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg, rgba(0,0,0,0.22), rgba(255,255,255,0.25));

  &__horizon {
    stroke: #000000;
  }

  &__airplane {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    width: 70%;
    height: auto;
    transform-origin: center center;
    fill: #ffffff;
  }

  &__value {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
