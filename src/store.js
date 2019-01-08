import Vue from 'vue';
import Vuex from 'vuex';

const { ipcRenderer } = require('electron');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    latitude: 0,
    longitude: 0,
    altitude: 0,
  },
  getters: {
    getLatitude: state => state.latitude,
    getLongitude: state => state.longitude,
    getAltitude: state => state.altitude,
  },
  mutations: {
    UPDATE_LATITUDE: (state, latitude) => {
      state.latitude = latitude; /* eslint-disable-line */
    },
    UPDATE_LONGITUDE: (state, longitude) => {
      state.longitude = longitude; /* eslint-disable-line */
    },
    UPDATE_ALTITUDE: (state, altitude) => {
      state.altitude = altitude; /* eslint-disable-line */
    },
  },
  actions: {
    receiveData: (context) => {
      ipcRenderer.on('position', (event, position) => {
        context.commit('UPDATE_LATITUDE', position.latitude);
        context.commit('UPDATE_LONGITUDE', position.longitude);
        context.commit('UPDATE_ALTITUDE', position.altitude);
      });
    },
  },
});
