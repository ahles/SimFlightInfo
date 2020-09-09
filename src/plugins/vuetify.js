import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#1b49a6',
      },
      dark: {
        primary: '#1b49a6',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
