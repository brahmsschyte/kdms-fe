import Vue from 'vue';
import Vuex from 'vuex';
import metadata from './modules/metadata';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    metadata,
    user,
  },
});
