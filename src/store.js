import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';

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
      const socket = io('http://localhost:3000');
      socket.on('position', (position) => {
        context.commit('UPDATE_LATITUDE', position.latitude);
        context.commit('UPDATE_LONGITUDE', position.longitude);
        context.commit('UPDATE_ALTITUDE', position.altitude);
      });
    },
  },
});
