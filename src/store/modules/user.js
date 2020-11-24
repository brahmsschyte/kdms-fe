import axios from 'axios';

// initial state
const state = {
  baseURL: 'https://mti-akpsi-api.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
  user: {},
  userList: [],
  userView: {},
};

// getters
const getters = {
};

// actions
const actions = {
  login({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      const data = {
        email: params.email,
        password: params.password,
      };
      axios.post(`${state.baseURL}/login`, data, { headers: state.headers })
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem('USER_TOKEN', response.data.token);
            localStorage.setItem('USER_ID', response.data.user.id)
            commit('setUser', response.data.user);
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  validate({ commit, state }) {
    return new Promise((resolve, reject) => {
      const headers = {
        Authorization: localStorage.getItem('USER_TOKEN'),
        'Content-Type': 'application/json',
      };
      axios.get(`${state.baseURL}/user/${localStorage.getItem('USER_ID')}`, { headers })
        .then((response) => {
          if (response.data.data) {
            commit('setUser', response.data.data);
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

  logout({ commit }) {
    localStorage.removeItem('USER_TOKEN');
    localStorage.removeItem('USER_ID');
    commit('unsetUser');
  },

  list({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      const headers = {
        Authorization: localStorage.getItem('USER_TOKEN'),
        'Content-Type': 'application/json',
      };
      axios.get(`${state.baseURL}/user`, { headers, params })
        .then((response) => {
          if (response.data.data) {
            commit('setUserList', response.data.data.items);
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
      axios.get(`${state.baseURL}/user/${params.id}`, { headers })
        .then((response) => {
          if (response.data.data) {
            commit('setUserView', response.data.data);
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
        title: params.title,
        email: params.email,
        password: params.password,
        phone: params.phone
      };
      axios.post(`${state.baseURL}/user`, data, { headers })
        .then((response) => {
          if (response.data.data) {
            commit('setUserView', response.data.data);
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
        title: params.title,
        email: params.email,
        phone: params.phone
      };
      if (params.password != '') {
        data.password = params.password;
      }
      axios.put(`${state.baseURL}/user/${params.id}`, data, { headers })
        .then((response) => {
          if (response.data.data) {
            commit('setUserView', response.data.data);
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
      axios.delete(`${state.baseURL}/user/${params.id}`, { headers })
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
  setUser(state, user) {
    state.user = user;
  },

  setUserList(state, users) {
    state.UserList = users;
  },

  setUserView(state, user) {
    state.userView = user;
  },

  unsetUser(state) {
    state.user = {};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
