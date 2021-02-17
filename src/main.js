import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import store from './store';
import i18n from './plugins/i18n';

require('../node_modules/leaflet/dist/leaflet.css');
require('../node_modules/leaflet-rotatedmarker/leaflet.rotatedMarker.js');

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
