import Vue from 'vue';
import Vuex from 'vuex';

const { ipcRenderer } = require('electron');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    receivingData: false,
    latitude: 47.368650,
    longitude: 8.539183,
    altitude: 0,
  },
  getters: {
    getReceivingData: state => state.receivingData,
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
    UPDATE_RECEIVING_DATA: (state, receivingData) => {
      state.receivingData = receivingData; /* eslint-disable-line */
    },
  },
  actions: {
    receiveData: ({ commit, state }) => {
      ipcRenderer.on('position', (event, position) => {
        if (!state.receivingData) {
          commit('UPDATE_RECEIVING_DATA', true);
        }
        commit('UPDATE_LATITUDE', position.latitude);
        commit('UPDATE_LONGITUDE', position.longitude);
        commit('UPDATE_ALTITUDE', position.altitude);
      });
    },
  },
});
