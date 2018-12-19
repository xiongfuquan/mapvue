export default {
  state: {
    map: {},
    mapView: {},
  },

  getters: {

  },

  mutations: {
    initMap(state, payload) {
      state.map = payload.map;
    },
    initMapView(state, payload) {
      state.mapView = payload;
    },
  },

  actions: {

  },
};
