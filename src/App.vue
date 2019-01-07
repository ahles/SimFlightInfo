<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      right
      app
    >
      <v-list two-line>
        <v-list-tile avatar>
          <v-icon large>flight</v-icon><span class="section-header">Position</span>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>Latitude</v-list-tile-title>
            <v-list-tile-sub-title>0</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>Longitude</v-list-tile-title>
            <v-list-tile-sub-title>0</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>Altitude</v-list-tile-title>
            <v-list-tile-sub-title>0</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark dense app>
      <v-toolbar-title>xpvuemap</v-toolbar-title>
      <v-spacer />
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: true,
  }),
};
</script>

<style lang="scss">
body {
  overflow: hidden;
}
.section-header {
  padding-left: 18px;
}
</style>
