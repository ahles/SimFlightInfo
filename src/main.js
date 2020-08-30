import Vue from 'vue';
import L from 'leaflet';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import store from './store';
import '@babel/polyfill';
import i18n from './i18n';

require('../node_modules/leaflet/dist/leaflet.css');
require('../node_modules/leaflet-rotatedmarker/leaflet.rotatedMarker.js');

/**
 * leaflet configuration
 * https://leafletjs.com/
 */
delete L.Icon.Default.prototype._getIconUrl; // eslint-disable-line no-underscore-dangle
L.Icon.Default.mergeOptions({
  iconSize: [40, 40],
  // iconAnchor: [20, 20],
  /* eslint-disable global-require */

  // default leaflet icons:
  // iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  // iconUrl: require('leaflet/dist/images/marker-icon.png'),
  // shadowUrl: require('leaflet/dist/images/marker-shadow.png'),

  // whereismyplane icon
  iconUrl: require('./assets/images/plane.svg'),
  /* eslint-enable global-require */
});

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
