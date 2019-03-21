import Vue from 'vue';
import Vuex from 'vuex';

import {
  VIEW_MODE_3D,
} from '../constants/action-types';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: VIEW_MODE_3D,
  },

  getter: {

  },

  mutations,

  actions,
});
