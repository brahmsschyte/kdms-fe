import axios from 'axios';

// initial state
const state = {
  baseURL: 'https://mti-akpsi-api.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
  workflowList: [],
  workflowView: {},
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
      axios.get(`${state.baseURL}/workflow`, { headers, params })
        .then((response) => {
          if (response.data.data) {
            commit('setWorkflowList', response.data.data.items);
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
      axios.get(`${state.baseURL}/workflow/${params.id}`, { headers })
        .then((response) => {
          if (response.data.data) {
            commit('setWorkflowView', response.data.data);
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
        steps: params.steps
      };
      axios.post(`${state.baseURL}/workflow`, data, { headers })
        .then((response) => {
          if (response.data.data) {
            commit('setWorkflowView', response.data.data);
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
        steps: params.steps
      };
      axios.put(`${state.baseURL}/workflow/${params.id}`, data, { headers })
        .then((response) => {
          if (response.data.data) {
            commit('setWorkflowView', response.data.data);
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
      axios.delete(`${state.baseURL}/workflow/${params.id}`, { headers })
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
  setWorkflowList(state, workflows) {
    state.WorkflowList = workflows;
  },

  setWorkflowView(state, workflow) {
    state.workflowView = workflow;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
