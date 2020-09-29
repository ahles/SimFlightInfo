import Vue from 'vue';
import Vuex from 'vuex';
import {
  jsonStoragePlugin,
  setJsonStorageKey,
  setJsonStorageMutations,
} from './jsonStoragePlugin';

Vue.use(Vuex);

const storage = require('electron-json-storage');

const storageKey = 'settings';
setJsonStorageKey(storageKey);

const userSettings = {
  mapLockedToPosition: true,
  zoomLevel: 14,
  locale: 'en',
  showInfoPanel: true,
  showGeonamesPanel: false,
  geonamesUser: null,
  showMarkerPanel: true,
  marker: {
    latitude: null,
    longitude: null,
  },
};

const jsonStorageMutations = [
  'SET_MAP_LOCKED_TO_POSITION',
  'SET_ZOOM_LEVEL',
  'SET_LOCALE',
  'SET_GEONAMES_USER',
  'SET_SHOW_INFO_PANEL',
  'SET_SHOW_GEONAMES_PANEL',
  'SET_SHOW_MARKER_PANEL',
  'SET_CUSTOM_MARKER_LATITUDE',
  'SET_CUSTOM_MARKER_LONGITUDE',
];
setJsonStorageMutations(jsonStorageMutations);

export default new Vuex.Store({
  plugins: [jsonStoragePlugin],
  state: {
    receivingData: false,
    drawer: false,
    simulationActive: false,
    userSettings,
  },
  getters: {
    getMarker: (state) => () => state.userSettings.marker,
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
    SET_SHOW_INFO_PANEL: (state, showInfoPanel) => {
      state.userSettings.showInfoPanel = showInfoPanel;
    },
    SET_SHOW_GEONAMES_PANEL: (state, showGeonamesPanel) => {
      state.userSettings.showGeonamesPanel = showGeonamesPanel;
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
    SET_SHOW_MARKER_PANEL: (state, showMarkerPanel) => {
      state.userSettings.showMarkerPanel = showMarkerPanel;
    },
    SET_CUSTOM_MARKER_LATITUDE: (state, latitude) => {
      state.userSettings.marker.latitude = latitude;
    },
    SET_CUSTOM_MARKER_LONGITUDE: (state, longitude) => {
      state.userSettings.marker.longitude = longitude;
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
            commit('SET_SHOW_INFO_PANEL', data.userSettings.showInfoPanel);
            commit('SET_SHOW_GEONAMES_PANEL', data.userSettings.showGeonamesPanel);
            commit('SET_SHOW_MARKER_PANEL', data.userSettings.showMarkerPanel);
            commit('SET_CUSTOM_MARKER_LATITUDE', data.userSettings.marker.latitude);
            commit('SET_CUSTOM_MARKER_LONGITUDE', data.userSettings.marker.longitude);
          });
        }
      });
    },
  },
});
