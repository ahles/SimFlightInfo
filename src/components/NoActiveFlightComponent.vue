<script setup lang="ts"></script>

<template>
  <div class="no-active-flight">
    <h2>Connected, but no flight started</h2>
  </div>
  <div class="no-active-flight__background">
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
  </div>
</template>

<style scoped>
.no-active-flight {
  position: absolute;
  z-index: 13;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 50%);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow:
    0 0.1rem 0.3rem rgba(0, 0, 0, 0.24),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.48);
}

.no-active-flight h2 {
  text-align: center;
}

.no-active-flight__icon {
  height: 2rem;
}

.no-active-flight__text {
  text-align: center;
  display: block;
  font-size: 1.2rem;
  font-weight: 400;
  margin-top: 1rem;
}

/* https://codepen.io/baarbaracrr/pen/KKovmGb */
.no-active-flight__background {
  position: absolute;
  z-index: 11;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, rgba(10, 38, 71, 1) 3%, rgba(20, 66, 114, 1) 38%, rgb(32, 82, 149) 68%, rgba(44, 116, 179, 1) 98%);
  animation: gradient 30s ease infinite;
  background-size: 400% 400%;
  background-attachment: fixed;
}

@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.wave {
  background: rgb(0 0 0 / 25%);
  border-radius: 1000% 1000% 0 0;
  position: fixed;
  width: 200%;
  height: 12em;
  animation: wave 10s -3s linear infinite;
  transform: translate3d(0, 0, 0);
  opacity: 0.8;
  bottom: 0;
  left: 0;
  z-index: 12;
}

.wave:nth-of-type(2) {
  bottom: -1.25em;
  animation: wave 18s linear reverse infinite;
  opacity: 0.8;
}

.wave:nth-of-type(3) {
  bottom: -2.5em;
  animation: wave 20s -1s reverse infinite;
  opacity: 0.9;
}

@keyframes wave {
  2% {
    transform: translateX(1);
  }

  25% {
    transform: translateX(-25%);
  }

  50% {
    transform: translateX(-50%);
  }

  75% {
    transform: translateX(-25%);
  }

  100% {
    transform: translateX(1);
  }
}
</style>
