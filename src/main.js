import Vue from 'vue';
import L from 'leaflet';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import store from './store';

require('../node_modules/leaflet/dist/leaflet.css');
require('../node_modules/leaflet-rotatedmarker/leaflet.rotatedMarker.js');

/**
 * leaflet configuration
 * https://leafletjs.com/
 */
delete L.Icon.Default.prototype._getIconUrl; // eslint-disable-line no-underscore-dangle
L.Icon.Default.mergeOptions({
  iconSize: [40, 40],
  /* eslint-disable global-require */

  // default leaflet icons:
  // iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  // iconUrl: require('leaflet/dist/images/marker-icon.png'),
  // shadowUrl: require('leaflet/dist/images/marker-shadow.png'),

  // whereismyplane icon
  iconUrl: require('./assets/images/plane.svg'),
  /* eslint-enable global-require */
});

/**
 * vuetify configuration
 * https://leafletjs.com/
 */
Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.base,
    secondary: colors.red.lighten4,
    accent: colors.indigo.base,
    error: colors.red.darken4,
  },
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
