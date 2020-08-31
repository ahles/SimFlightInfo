import Vue from 'vue';
import Vuex from 'vuex';

const { ipcRenderer } = require('electron');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {
      messageIndex: 0,
      receivingData: false,
      latitude: 0,
      longitude: 0,
      altitudeSea: 0, // m
      bearing: 0,
      groundSpeed: 0, // m/s
      mapLockedToPosition: true,
      zoomLevel: 10,
    },
    simulationActive: false,
    locale: 'en',
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    UPDATE_RECEIVING_DATA: (state, receivingData) => {
      state.data.receivingData = receivingData;
    },
    UPDATE_MESSAGE_INDEX: (state, messageIndex) => {
      state.data.messageIndex = messageIndex;
    },
    UPDATE_LATITUDE: (state, latitude) => {
      state.data.latitude = latitude;
    },
    UPDATE_LONGITUDE: (state, longitude) => {
      state.data.longitude = longitude;
    },
    UPDATE_ALTITUDE_SEA: (state, altitudeSea) => {
      state.data.altitudeSea = altitudeSea;
    },
    UPDATE_GROUND_SPEED: (state, groundSpeed) => {
      state.data.groundSpeed = groundSpeed;
    },
    UPDATE_BEARING: (state, bearing) => {
      state.data.bearing = bearing;
    },
    UPDATE_MAP_LOCKED_TO_POSITION: (state, mapLockedToPosition) => {
      state.data.mapLockedToPosition = mapLockedToPosition;
    },
    UPDATE_ZOOM_LEVEL: (state, zoomLevel) => {
      state.data.zoomLevel = zoomLevel;
    },
    UPDATE_SIMULATION_ACTIVE: (state, simulationActive) => {
      state.simulationActive = simulationActive;
    },
    SET_LOCALE: (state, locale) => {
      state.locale = locale;
    },
    /* eslint-enable no-param-reassign */
  },
  actions: {
    simulateData: ({ commit, state }) => {
      const positions = require('../assets/example-flight.json'); // eslint-disable-line
      if (!state.data.receivingData) {
        commit('UPDATE_RECEIVING_DATA', true);
      }
      commit('UPDATE_ZOOM_LEVEL', 14);
      for (let i = 0; i < positions.length; i += 1) {
        ((x, pos) => {
          if (typeof positions[i] !== 'undefined') {
            setTimeout(() => {
              if (state.simulationActive && typeof pos[x] !== 'undefined') {
                commit('UPDATE_LATITUDE', pos[x].latitude);
                commit('UPDATE_LONGITUDE', pos[x].longitude);
                commit('UPDATE_ALTITUDE_SEA', pos[x].altitudeSea);
                commit('UPDATE_GROUND_SPEED', pos[x].groundSpeed);
                commit('UPDATE_BEARING', pos[x].bearing);
                commit('UPDATE_MESSAGE_INDEX', i);
              }
            }, x * 1000, positions);
          }
        })(i, positions);
      }
    },
    receiveData: ({ commit, state }) => {
      ipcRenderer.on('position', (event, position) => {
        if (!state.data.receivingData) {
          commit('UPDATE_RECEIVING_DATA', true);
        }
        if (position.messageIndex !== state.data.messageIndex) { commit('UPDATE_MESSAGE_INDEX', position.messageIndex); }
        if (position.latitude !== state.data.latitude) { commit('UPDATE_LATITUDE', position.latitude); }
        if (position.longitude !== state.data.longitude) { commit('UPDATE_LONGITUDE', position.longitude); }
        if (position.altitudeSea !== state.data.altitudeSea) { commit('UPDATE_ALTITUDE_SEA', position.altitudeSea); }
        if (position.groundSpeed !== state.data.groundSpeed) { commit('UPDATE_GROUND_SPEED', position.groundSpeed); }
        if (position.bearing !== state.data.bearing) { commit('UPDATE_BEARING', position.bearing); }
      });
    },
  },
});
