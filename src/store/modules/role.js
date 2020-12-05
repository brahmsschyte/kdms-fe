import axios from 'axios';

// initial state
const state = {
  baseURL: 'https://mti-akpsi-api.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
  roleList: [],
  roleView: {},
};

// getters
const getters = {
};

// actions
const actions = {list({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      const headers = {
        Authorization: localStorage.getItem('USER_TOKEN'),
        'Content-Type': 'application/json',
      };
      axios.get(`${state.baseURL}/role`, { headers, params })
        .then((response) => {
          if (response.data.data) {
            commit('setRoleList', response.data.data.items);
            resolve(response.data.data.items);
          } else {
            reject(response.data.data.err);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  view({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      const headers = {
        Authorization: localStorage.getItem('USER_TOKEN'),
        'Content-Type': 'application/json',
      };
      axios.get(`${state.baseURL}/role/${params.id}`, { headers })
        .then((response) => {
          if (response.data.data) {
            commit('setRoleView', response.data.data);
            resolve(response.data.data);
          } else {
            reject(response.data.data.err);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  create({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      const headers = {
        Authorization: localStorage.getItem('USER_TOKEN'),
        'Content-Type': 'application/json',
      };
      const data = {
        name: params.name,
        create: params.create,
        read: params.read,
        update: params.update,
        delete: params.delete
      };
      axios.post(`${state.baseURL}/role`, data, { headers })
        .then((response) => {
          if (response.data.data) {
            commit('setRoleView', response.data.data);
            resolve(response.data.data);
          } else {
            reject(response.data.data.err);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  update({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      const headers = {
        Authorization: localStorage.getItem('USER_TOKEN'),
        'Content-Type': 'application/json',
      };
      let data = {
        name: params.name,
        create: params.create,
        read: params.read,
        update: params.update,
        delete: params.delete
      };
      axios.put(`${state.baseURL}/role/${params.id}`, data, { headers })
        .then((response) => {
          if (response.data.data) {
            commit('setRoleView', response.data.data);
            resolve(response.data.data);
          } else {
            reject(response.data.data.err);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  delete({ state }, params) {
    return new Promise((resolve, reject) => {
      const headers = {
        Authorization: localStorage.getItem('USER_TOKEN'),
        'Content-Type': 'application/json',
      };
      axios.delete(`${state.baseURL}/role/${params.id}`, { headers })
        .then((response) => {
          if (response.data.data) {
            resolve(true);
          } else {
            reject(response.data.data.err);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

// mutations
const mutations = {
  setRoleList(state, roles) {
    state.RoleList = roles;
  },

  setRoleView(state, role) {
    state.roleView = role;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
