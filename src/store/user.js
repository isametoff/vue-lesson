import * as authApi from '@/api/auth.js';

export default {
  namespaced: true,
  state: {
    user: null,
    errors: [],
  },
  getters: {
    isLogin: (state) => state.user !== null,
    allAlerts: (state) => state.errors,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    addAlerts(state, { email, login, password, password_confirmation }) {
      state.errors = {
        email: email[0],
        login: login[0],
        password: password[0],
        password_confirmation: password_confirmation[0],
      };
    },
  },
  actions: {
    async registration(
      { state },
      { email, login, password, password_confirmation }
    ) {
      let data = await authApi.registration(
        email,
        login,
        password,
        password_confirmation
      );
      return data;
    },
    clean({ commit }) {
      commit('setUser', null);
    },
    addAlerts(
      { commit, getters, state },
      { email, login, password, password_confirmation }
    ) {
      commit('addAlerts', {
        email,
        login,
        password,
        password_confirmation,
      });
    },
  },
};
