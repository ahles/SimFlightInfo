<script setup lang="ts">
defineProps<{
  pitch: number
}>()
</script>

<template>
  <div class="pitch">
    <svg class="pitch__airplane" :style="`transform: translate(-50%, -50%) rotateZ(${pitch}deg)`" width="1039" height="222.04" version="1.1" viewBox="0 0 274.9 58.749" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(.1237 -.17183)">
        <g transform="matrix(2.3988 0 0 2.3988 -69.318 -272.59)" fill="#ffffff">
          <path d="m42.361 124.55h100.53v13.096h-100.53z" fill-rule="evenodd" stroke-width=".29725" />
          <path d="m34.071 137.58a4.6752 4.6752 0 0 1-4.0494-2.3384 4.6752 4.6752 0 0 1 0.0014-4.6761 4.6752 4.6752 0 0 1 4.0508-2.336l-0.0029 4.6752z" stroke-width=".26458" />
          <path d="m32.308 128.63 10.077-4.0866v13.098l-8.3133-0.0605z" />
          <path d="m142.89 124.55v-10.29h-3.6412l-12.428 10.424z" />
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.pitch {
  position: relative;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  border: 1px solid #fff;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.22), rgba(255, 255, 255, 0.25));
}

.pitch__horizon {
  stroke: #000000;
}

.pitch__airplane {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70%;
  height: auto;
  transform-origin: center center;
  fill: #ffffff;
  transition: transform 0.3s linear;
}
</style>
