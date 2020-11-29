import axios from 'axios';

// initial state
const state = {
  baseURL: 'https://mti-akpsi-api.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
  metadataList: [],
  metadataView: {},
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
      axios.get(`${state.baseURL}/metadata`, { headers, params })
        .then((response) => {
          if (response.data.data) {
            commit('setMetadataList', response.data.data.items);
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
      axios.get(`${state.baseURL}/metadata/${params.id}`, { headers })
        .then((response) => {
          if (response.data.data) {
            commit('setMetadataView', response.data.data);
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
        fieldName: params.fieldName,
        fieldType: params.fieldType,
        isRequired: params.isRequired
      };
      axios.post(`${state.baseURL}/metadata`, data, { headers })
        .then((response) => {
          if (response.data.data) {
            commit('setMetadataView', response.data.data);
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
        fieldName: params.fieldName,
        fieldType: params.fieldType,
        isRequired: params.isRequired
      };
      axios.put(`${state.baseURL}/metadata/${params.id}`, data, { headers })
        .then((response) => {
          if (response.data.data) {
            commit('setMetadataView', response.data.data);
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
      axios.delete(`${state.baseURL}/metadata/${params.id}`, { headers })
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
  setMetadataList(state, metadatas) {
    state.MetadataList = metadatas;
  },

  setMetadataView(state, metadata) {
    state.metadataView = metadata;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
