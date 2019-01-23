import Vue from 'vue';
import L from 'leaflet';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import store from './store';

require('../node_modules/leaflet/dist/leaflet.css');

delete L.Icon.Default.prototype._getIconUrl; // eslint-disable-line no-underscore-dangle

L.Icon.Default.mergeOptions({
  iconSize: [25, 25],
  /* eslint-disable global-require */
  iconUrl: require('./assets/images/marker.png'),
  /* eslint-enable global-require */
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
  store,
  render: h => h(App),
}).$mount('#app');
