import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: localStorage.getItem('token') || '',
    isLoggedIn: !!localStorage.getItem('token'),
    user: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem('token', token);
    },
    CLEAR_TOKEN(state) {
      state.token = '';
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    loginAction({ commit }, token) { // Renommé en loginAction
      commit('SET_TOKEN', token);
    },
    logoutAction({ commit }) { // Renommé en logoutAction
      commit('CLEAR_TOKEN');
    },
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    getToken: state => state.token,
    getUser: state => state.user,
  },
});

export default store;