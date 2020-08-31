<template>
  <v-app-bar
    dark
    dense
    app
    clipped-right
  >
    <v-toolbar-title>
      <v-icon
        dark
        class="app-icon"
      >
        flight
      </v-icon> Whereismyplane
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      ripple
      small
      class="window-button"
      @click.stop="minimizeWindow"
    >
      <v-icon
        dark
      >
        minimize
      </v-icon>
    </v-btn>
    <v-btn
      ripple
      small
      class="window-button"
      @click.stop="maximizeWindow"
    >
      <v-icon
        dark
      >
        maximize
      </v-icon>
    </v-btn>
    <v-btn
      ripple
      small
      class="window-button"
      @click.stop="closeWindow"
    >
      <v-icon dark>
        close
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
const { remote } = require('electron');

export default {
  name: 'Header',
  created() {
    this.window = remote.getCurrentWindow();
  },
  methods: {
    closeWindow() {
      this.window.close();
    },
    minimizeWindow() {
      this.window.minimize();
    },
    maximizeWindow() {
      if (!this.window.isMaximized()) {
        this.window.maximize();
      } else {
        this.window.unmaximize();
      }
    },
  },
};
</script>
