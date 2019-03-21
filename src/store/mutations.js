import { initMap, switchMap } from '../middleware/mapAction';
import { VIEW_MODE_2D, VIEW_MODE_3D } from '../constants/action-types';

export default {
  init(state, payload) {
    initMap(state, payload);
  },

  switchMap_M(state) {
    state.mode = state.mode === VIEW_MODE_2D ? VIEW_MODE_3D : VIEW_MODE_2D;
    switchMap(state);
  },
};
