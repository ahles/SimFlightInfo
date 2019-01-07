import Vue from 'vue';
import L from 'leaflet';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';
import store from './store';

/* eslint-disable */

require('../node_modules/leaflet/dist/leaflet.css');
require('./lib/leaflet.rotatedMarker.js');

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../node_modules/leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('../node_modules/leaflet/dist/images/marker-icon.png'),
  // shadowUrl: require('../node_modules/leaflet/dist/images/marker-shadow.png'),
});

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.base,
    secondary: colors.red.lighten4,
    accent: colors.indigo.base,
    error: colors.red.darken4,
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // Prevent blank screen in Electron builds
    this.$router.push('/')
  }
}).$mount('#app');
