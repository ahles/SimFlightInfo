import Vue from 'vue';
import Vuex from 'vuex';
import jsonStorage from './jsonStorage';

const storage = require('electron-json-storage');

const storageKey = 'settings';

Vue.use(Vuex);

const userSettings = {
  mapLockedToPosition: true,
  zoomLevel: 14,
  locale: 'en',
  geonamesUser: null,
};

export default new Vuex.Store({
  plugins: [jsonStorage],
  state: {
    receivingData: false,
    drawer: false,
    simulationActive: false,
    userSettings,
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    SET_RECEIVING_DATA: (state, receivingData) => {
      state.receivingData = receivingData;
    },
    SET_SIMULATION_ACTIVE: (state, simulationActive) => {
      state.simulationActive = simulationActive;
    },
    SET_DRAWER: (state, drawer) => {
      state.drawer = drawer;
    },
    SET_MAP_LOCKED_TO_POSITION: (state, mapLockedToPosition) => {
      state.userSettings.mapLockedToPosition = mapLockedToPosition;
    },
    SET_ZOOM_LEVEL: (state, zoomLevel) => {
      state.userSettings.zoomLevel = zoomLevel;
    },
    SET_LOCALE: (state, locale) => {
      state.userSettings.locale = locale;
    },
    SET_GEONAMES_USER: (state, geonamesUser) => {
      state.userSettings.geonamesUser = geonamesUser;
    },
    /* eslint-enable no-param-reassign */
  },
  actions: {
    getJsonSettings({ commit }) {
      storage.has(storageKey, (error, hasKey) => {
        if (hasKey) {
          storage.get(storageKey, (error2, data) => {
            commit('SET_MAP_LOCKED_TO_POSITION', data.userSettings.mapLockedToPosition);
            commit('SET_ZOOM_LEVEL', data.userSettings.zoomLevel);
            commit('SET_LOCALE', data.userSettings.locale);
            commit('SET_GEONAMES_USER', data.userSettings.geonamesUser);
          });
        }
      });
    },
  },
});
