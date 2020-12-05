import Vue from 'vue';
import Vuex from 'vuex';
import metadata from './modules/metadata';
import role from './modules/role';
import workflow from './modules/workflow';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    metadata,
    role,
    workflow,
    user,
  },
});
