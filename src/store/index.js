import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    receivingData: false,
    mapLockedToPosition: true,
    zoomLevel: 10,
    drawer: false,
    simulationActive: false,
    locale: 'en',
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    UPDATE_RECEIVING_DATA: (state, receivingData) => {
      state.receivingData = receivingData;
    },
    UPDATE_MAP_LOCKED_TO_POSITION: (state, mapLockedToPosition) => {
      state.mapLockedToPosition = mapLockedToPosition;
    },
    UPDATE_ZOOM_LEVEL: (state, zoomLevel) => {
      state.zoomLevel = zoomLevel;
    },
    UPDATE_SIMULATION_ACTIVE: (state, simulationActive) => {
      state.simulationActive = simulationActive;
    },
    SET_LOCALE: (state, locale) => {
      state.locale = locale;
    },
    SET_DRAWER: (state, drawer) => {
      state.drawer = drawer;
    },
    /* eslint-enable no-param-reassign */
  },
});
