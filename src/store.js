import Vue from 'vue';
import Vuex from 'vuex';

const { ipcRenderer } = require('electron');

Vue.use(Vuex);

const globalPositions = [];

export default new Vuex.Store({
  state: {
    data: {
      receivingData: false,
      latitude: 47.368650,
      longitude: 8.539183,
      altitudeSea: 0,
      altitudeGround: 0,
      onRunway: false,
      mapLockedToPosition: true,
      zoomLevel: 10,
      view: 'Map',
    },
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    UPDATE_RECEIVING_DATA: (state, receivingData) => {
      state.data.receivingData = receivingData;
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
    UPDATE_ALTITUDE_GROUND: (state, altitudeGround) => {
      state.data.altitudeGround = altitudeGround;
    },
    UPDATE_ON_RUNWAY: (state, onRunway) => {
      state.data.onRunway = onRunway;
    },
    UPDATE_MAP_LOCKED_TO_POSITION: (state, mapLockedToPosition) => {
      state.data.mapLockedToPosition = mapLockedToPosition;
    },
    UPDATE_ZOOM_LEVEL: (state, zoomLevel) => {
      state.data.zoomLevel = zoomLevel;
    },
    UPDATE_VIEW: (state, view) => {
      state.data.view = view;
    },
    /* eslint-enable no-param-reassign */
  },
  actions: {
    simulateData: ({ commit, state }) => {
      const positions = require('./log.json'); // eslint-disable-line
      if (!state.data.receivingData) {
        commit('UPDATE_RECEIVING_DATA', true);
      }
      for (var i = 0; i < positions.length; i++) {
        ((x, pos) => {
          if (typeof positions[i] !== 'undefined') {
            setTimeout(() => {
              if (typeof pos[x] !== 'undefined') {
                commit('UPDATE_LATITUDE', pos[x].latitude);
                commit('UPDATE_LONGITUDE', pos[x].longitude);
                commit('UPDATE_ALTITUDE_SEA', pos[x].altitudeSea);
                if (pos[x].altitudeGround > 0) {
                  commit('UPDATE_ALTITUDE_GROUND', pos[x].altitudeGround);
                } else {
                  commit('UPDATE_ALTITUDE_GROUND', 0);
                }
                if (pos[x].onRunway === 1 && state.data.altitudeGround < 1) {
                  commit('UPDATE_ON_RUNWAY', 1);
                } else {
                  commit('UPDATE_ON_RUNWAY', 0);
                }
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
        if (position.latitude !== state.data.latitude) { commit('UPDATE_LATITUDE', position.latitude); }
        if (position.longitude !== state.data.longitude) { commit('UPDATE_LONGITUDE', position.longitude); }
        if (position.altitudeSea !== state.data.altitudeSea) { commit('UPDATE_ALTITUDE_SEA', position.altitudeSea); }
        if (position.altitudeGround !== state.data.altitudeGround) {
          if (position.altitudeGround > 0) {
            commit('UPDATE_ALTITUDE_GROUND', position.altitudeGround);
          } else {
            commit('UPDATE_ALTITUDE_GROUND', 0);
          }
        }
        if (position.onRunway !== state.data.onRunway) {
          if (position.onRunway === 1 && state.data.altitudeGround < 1) {
            commit('UPDATE_ON_RUNWAY', 1);
          } else {
            commit('UPDATE_ON_RUNWAY', 0);
          }
        }
      });
    },
  },
});

function delay(ms) {
  return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
