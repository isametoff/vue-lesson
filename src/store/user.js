import * as regApi from '@/api/registration.js';
import * as authApi from '@/api/auth.js';

export default {
  namespaced: true,
  state: {
    user: null,
    errors: { login: '', password: '' },
  },
  getters: {
    isLogin: (state) => state.user !== null,
    allAlerts: (state) => state.errors,
    allUser: (state) => state.user,
    isAlertsLogin: (state) => (state.errors?.login !== '' ? true : false),
    isAlertsPassword: (state) => (state.errors?.password !== '' ? true : false),
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    cleanErrors(state) {
      state.errors = [];
    },
    addAlerts(state, { email, login, password, password_confirmation }) {
      state.errors = {
        email: email,
        login: login,
        password: password,
        password_confirmation: password_confirmation,
      };
    },
    addAlertsLogin(state, { login }) {
      state.errors.login = login;
    },
    addAlertsPassword(state, { password }) {
      state.errors.password = password;
    },
  },
  actions: {
    async registration(
      { state, commit, getters },
      { email, login, password, password_confirmation, register }
    ) {
      let { res, data } = await regApi.registration({
        email: email,
        login: login,
        password: password,
        password_confirmation: password_confirmation,
        register: register,
      });

      if (res === true) {
        commit('cleanErrors');
      } else {
        let { email, login, password, password_confirmation } = data;
        email = email?.[0] ?? '';
        login = login?.[0] ?? '';
        password = password?.[0] ?? '';
        password_confirmation = password_confirmation?.[0] ?? '';
        commit('addAlerts', {
          email,
          login,
          password,
          password_confirmation,
        });
      }
      return data;
    },
    async auth({ state, commit }, { login, password, isAuth }) {
      console.log('🚀 ~ file: user.js ~ line 63 ~ auth ~ is_auth', isAuth);
      let { res, data } = await authApi.auth({
        login,
        password,
        isAuth,
      });
      console.log('🚀 ~ file: user.js ~ line 69 ~ auth ~ { res, data }', {
        res,
        data,
      });

      if (res === true && data === true) {
        commit('cleanErrors');
      } else {
        let { login, password } = data;
        login = login?.[0] ?? '';
        password = password?.[0] ?? '';
        commit('addAlerts', {
          password,
          login,
        });
      }
      return data;
    },
    async authValidate({ state, commit }, { login, password }) {
      let { res, data } = await authApi.auth({ login, password });
      if (res === true && data === true) {
        commit('cleanErrors');
      }
      if (login !== '') {
        let { login } = data;
        login = login?.[0] ?? '';
        commit('addAlertsLogin', {
          login,
        });
      }
      if (password !== '') {
        let { password } = data;
        password = password?.[0] ?? '';
        commit('addAlertsPassword', {
          password,
        });
      }
      return data;
    },
    cleanErrors({ commit }) {
      commit('cleanErrors');
    },
  },
};
