import Vue from 'vue';
import Vuex from 'vuex';

const { ipcRenderer } = require('electron');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    receivingData: false,
    latitude: 47.368650,
    longitude: 8.539183,
    altitudeSea: 0,
    altitudeGround: 0,
    onRunway: false,
    mapLockedToPosition: true,
  },
  getters: {
    getReceivingData: state => state.receivingData,
    getLatitude: state => state.latitude,
    getLongitude: state => state.longitude,
    getAltitudeSea: state => state.altitudeSea,
    getAltitudeGround: state => state.altitudeGround,
    getOnRunway: state => state.onRunway,
    getMapLockedToPosition: state => state.mapLockedToPosition,
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    UPDATE_RECEIVING_DATA: (state, receivingData) => {
      state.receivingData = receivingData;
    },
    UPDATE_LATITUDE: (state, latitude) => {
      state.latitude = latitude;
    },
    UPDATE_LONGITUDE: (state, longitude) => {
      state.longitude = longitude;
    },
    UPDATE_ALTITUDE_SEA: (state, altitudeSea) => {
      state.altitudeSea = altitudeSea;
    },
    UPDATE_ALTITUDE_GROUND: (state, altitudeGround) => {
      state.altitudeGround = altitudeGround;
    },
    UPDATE_ON_RUNWAY: (state, onRunway) => {
      state.onRunway = onRunway;
    },
    UPDATE_MAP_LOCKED_TO_POSITION: (state, mapLockedToPosition) => {
      state.mapLockedToPosition = mapLockedToPosition;
    },
    /* eslint-enable no-param-reassign */
  },
  actions: {
    receiveData: ({ commit, state }) => {
      ipcRenderer.on('position', (event, position) => {
        if (!state.receivingData) {
          commit('UPDATE_RECEIVING_DATA', true);
        }
        if (position.latitude !== state.latitude) { commit('UPDATE_LATITUDE', position.latitude); }
        if (position.longitude !== state.longitude) { commit('UPDATE_LONGITUDE', position.longitude); }
        if (position.altitudeSea !== state.altitudeSea) { commit('UPDATE_ALTITUDE_SEA', position.altitudeSea); }
        if (position.altitudeGround !== state.altitudeGround) {
          if (position.altitudeGround > 0) {
            commit('UPDATE_ALTITUDE_GROUND', position.altitudeGround);
          } else {
            commit('UPDATE_ALTITUDE_GROUND', 0);
          }
        }
        if (position.onRunway !== state.onRunway) { commit('UPDATE_ON_RUNWAY', position.onRunway); }
      });
    },
  },
});
